package com.kids.SEB_main_030.global.image.service;


import com.kids.SEB_main_030.domain.post.dto.PostDto;
import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;

import com.kids.SEB_main_030.global.image.repository.ImageRepository;
import com.kids.SEB_main_030.global.image.entity.Image;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.post.entity.Post;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {

    @Getter
    @Value("${url.image.profile}")
    private String defaultProfileImage;
    @Getter
    @Value("${url.image.kindergarten}")
    private String defaultKindergartenImage;

    private final ImageUploader imageUploader;
    private final ImageRepository imageRepository;

    // 다중이미지 업로드(kindergarten, post 에서 사용)
    // s3저장후 s3경로를 만들고 Image 테이블에 경로 저장
    public void imagesUpload(List<MultipartFile> images, Object object, String location) {
        List<String> imagePaths = imageUploader.upload(images, location);
        postBlankCheck(imagePaths);
        for (String imagePath : imagePaths) {
            Image image = new Image();
            image.setImageUrl(imagePath);
            if (object instanceof Post) {
                Post post = (Post) object;
                image.setPost(post);
            }
            imageRepository.save(image);
        }
    }

    // 단일이미지 업로드(users, profile 에서 사용)
    // s3저장후 s3경로를 리턴(리턴값을 db에 저장)
    public String imageUpload(MultipartFile image, String location) {
        List<MultipartFile> images = List.of(image);
        List<String> imagePath = imageUploader.upload(images, location);
        if (imagePath.size() != 1) throw new LogicException(CustomException.IMAGE_UPLOAD_ERROR);
        return imagePath.get(0);
    }

    public List<Image> findImagesByImageIds(List<Long> imageIds) {
        return imageIds.stream()
                .map(imageId -> findImageByImageId(imageId))
                .collect(Collectors.toList());
    }

    // imageId 로 이미지 찾기
    public Image findImageByImageId(Long imageId) {
        return verifyExistsImageByImageId(imageId);
    }

    // post 로 이미지 찾기
    public List<Image> findByPost(Post post) {
        return imageRepository.findByPost(post);
    }

    // 게시물 리스트 대표사진 URLS
    public List<String> findTopImages(List<Post> posts) {
        List<String> imageUrls = new ArrayList<>();
        for (Post post : posts) {
            Image topImage = findTopImage(post);
            if (topImage != null) imageUrls.add(topImage.getImageUrl());
            else imageUrls.add(null);
        }
        return imageUrls;
    }

    // 게시물 리스트 대표사진 URL
    public Image findTopImage(Post post) {
        return imageRepository.findTopByPostOrderByImageIdAsc(post);
    }

    public void imagesDelete(List<Image> images) {
        for (Image image : images) {
            s3imageDelete(image.getImageUrl());
            dbImageDelete(image);
        }
    }

    public void dbImageDelete(Image image) {
        imageRepository.delete(image);
    }

    public void s3imageDelete(String imageUrl) {
        imageUploader.delete(imageUrl);
    }

    private void postBlankCheck(List<String> imagePaths) {
        if(imagePaths == null || imagePaths.isEmpty()) {
            throw new LogicException(CustomException.IMAGE_NOT_FOUND);
        }
    }
    // imageId로 image 찾기 예외처리
    private Image verifyExistsImageByImageId(Long imageId) {
        return imageRepository.findById(imageId)
                .orElseThrow(() -> new LogicException(CustomException.IMAGE_NOT_FOUND));
    }
}
