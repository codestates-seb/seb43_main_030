package com.kids.SEB_main_030.global.image.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class ImageUploader {

    private final AmazonS3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    // 다중 이미지 업로드(kindergarten, post)
    public List<String> upload(List<MultipartFile> multipartFile, String location) {
        List<String> imgUrlList = new ArrayList<>();

        // forEach 구문을 통해 multipartFile로 넘어온 파일들 하나씩 fileNameList에 추가
        for (MultipartFile file : multipartFile) {
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try(InputStream inputStream = file.getInputStream()) {
                s3Client.putObject(new PutObjectRequest(bucket + location, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
                imgUrlList.add(s3Client.getUrl(bucket + location, fileName).toString());
            } catch(IOException e) {
                throw new LogicException(CustomException.IMAGE_UPLOAD_ERROR);
            }
        }
        return imgUrlList;
    }

    // 이미지파일명 중복 방지
    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    public void delete(String imageUrl) {
        String fileName = imageUrl;
        for (int i = 0; i < 2; i++) {
            fileName = fileName.substring(0, fileName.lastIndexOf('/'));
        }
        imageUrl = imageUrl.substring(fileName.lastIndexOf('/') + 1);
        log.info("=".repeat(100) + imageUrl);
        log.info("=".repeat(100) + bucket);
        boolean isObjectExist = s3Client.doesObjectExist(bucket, imageUrl);
        log.info("=".repeat(100) + isObjectExist);
        if (!isObjectExist) throw new LogicException(CustomException.IMAGE_NOT_FOUND);

        // s3 객체 삭제 로직
        s3Client.deleteObject(new DeleteObjectRequest(bucket, imageUrl));
    }

    // 파일 유효성 검사
    private String getFileExtension(String fileName) {
        if (fileName.length() == 0) {
            throw new LogicException(CustomException.IMAGE_NOT_FOUND);
        }
        ArrayList<String> fileValidate = new ArrayList<>();
        fileValidate.add(".jpg");
        fileValidate.add(".jpeg");
        fileValidate.add(".png");
        fileValidate.add(".JPG");
        fileValidate.add(".JPEG");
        fileValidate.add(".PNG");
        String idxFileName = fileName.substring(fileName.lastIndexOf("."));
        if (!fileValidate.contains(idxFileName)) {
            throw new LogicException(CustomException.IMAGE_EXTENSION_WRONG);
        }
        return fileName.substring(fileName.lastIndexOf("."));
    }

}
