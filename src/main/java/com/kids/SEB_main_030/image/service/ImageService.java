package com.kids.SEB_main_030.image.service;

import com.kids.SEB_main_030.exception.CustomException;
import com.kids.SEB_main_030.exception.LogicException;

import com.kids.SEB_main_030.image.entity.Image;
import com.kids.SEB_main_030.image.repository.ImageRepository;
import com.kids.SEB_main_030.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.post.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {

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
                Post object1 = (Post) object;
                image.setPost(object1);
            } else {
                Kindergarten object1 = (Kindergarten) object;
//                image.setKindergarten(object1);
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

    // 구현중
    public void imageDelete(String imageUrl) {
        imageUploader.delete(imageUrl);
    }

    private void postBlankCheck(List<String> imagePaths) {
        if(imagePaths == null || imagePaths.isEmpty()) {
            throw new LogicException(CustomException.IMAGE_NOT_FOUND);
        }
    }
}
