package com.kids.SEB_main_030.domain.kindergarten.controller;

import com.kids.SEB_main_030.domain.community.service.CommunityService;
import com.kids.SEB_main_030.domain.kindergarten.dto.KindergartenPostDto;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.kindergarten.mapper.KindergartenMapper;
import com.kids.SEB_main_030.domain.kindergarten.service.KindergartenService;
import com.kids.SEB_main_030.global.dto.MultiResponseDto;
import com.kids.SEB_main_030.global.dto.SingleResponseDto;
import com.kids.SEB_main_030.domain.kindergarten.dto.KindergartenResponseDto;
import com.kids.SEB_main_030.global.utils.UriCreator;
import com.kids.SEB_main_030.global.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@Validated
@Slf4j
@Transactional
@RequestMapping("/api/kindergarten")
@RequiredArgsConstructor
public class KindergartenController {
    private final static String KINDERGARTEN_DEFAULT_URL="/api/kindergarten";
    private final KindergartenService kindergartenService;
    private final KindergartenMapper kindergartenMapper;
    private final CommunityService communityService;


    @PostMapping
    public ResponseEntity postKindergarten(@Valid @RequestBody KindergartenPostDto kindergartenPostDto)
    {
        Kindergarten kindergarten = kindergartenMapper.kindergartenPostDtoToKindergarten(kindergartenPostDto);
        kindergarten.setCommunity(communityService.setDefaultCommunity(kindergarten));
        Kindergarten createdKindergarten = kindergartenService.createKindergarten(kindergarten);
        URI location = UriCreator.createUri(KINDERGARTEN_DEFAULT_URL, createdKindergarten.getKindergartenId());

        return ResponseEntity.created(location).build();
    }
    @GetMapping("/{kindergarten-id}")
    public ResponseEntity getKindergarten(@PathVariable("kindergarten-id")@Positive long kindergartenId){
        Kindergarten kindergarten = kindergartenService.findKindergarten(kindergartenId);
        return new ResponseEntity<>(new SingleResponseDto<>(kindergartenMapper.kindergartenToKindergartenResponseDto(kindergarten)), HttpStatus.OK);
    }
    @GetMapping("/name/{name-keyword}")
    public ResponseEntity getKindergartensByTitle(@PathVariable("name-keyword") String nameKeyword ){
        List<Kindergarten>kindergartens=kindergartenService.findKindergartensByTitle(nameKeyword);
        List<KindergartenResponseDto>response = kindergartenMapper.kindergartensToKindergartenResponseDtos(kindergartens);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getKindergartens(@Positive @RequestParam int page,@Positive @RequestParam int size){
        Page<Kindergarten> pageKindergartens=kindergartenService.findKindergartens(page-1,size);
        List<Kindergarten>kindergartens = pageKindergartens.getContent();
        List<KindergartenResponseDto>response = kindergartenMapper.kindergartensToKindergartenResponseDtos(kindergartens);
        return new ResponseEntity<>(new MultiResponseDto<>(response,pageKindergartens),HttpStatus.OK);
    }
    @GetMapping("/loc")
    public ResponseEntity getKindergartensByLocation(@RequestParam String locationFilter,
                                                     @Positive @RequestParam int page,
                                                     @Positive @RequestParam int size){
        Page<Kindergarten> pageKindergartens=kindergartenService.findKindergartensByLocation(locationFilter,page-1,size);
        List<Kindergarten>kindergartens = pageKindergartens.getContent();
        List<KindergartenResponseDto>response = kindergartenMapper.kindergartensToKindergartenResponseDtos(kindergartens);
        return new ResponseEntity<>(new MultiResponseDto<>(response,pageKindergartens),HttpStatus.OK);
    }
    @GetMapping("/loc/{category-id}")
    public ResponseEntity getKindergartensByLocationCategory(@PathVariable("category-id")int categoryId){
        List<Kindergarten> kindergartens = kindergartenService.findKindergartensByLocationCategory(categoryId);
        List<KindergartenResponseDto>response = kindergartenMapper.kindergartensToKindergartenResponseDtos(kindergartens);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PatchMapping("/{kindergarten-id}")
    public ResponseEntity patchKindergartenImage(@PathVariable("kindergarten-id")@Positive long kindergartenId,
                                                 @RequestPart MultipartFile image) {
        Kindergarten updateKindergarten = kindergartenService.updateImage(image, kindergartenId);
        URI location = UriCreator.createUri(KINDERGARTEN_DEFAULT_URL, updateKindergarten.getKindergartenId());
        return ResponseEntity.created(location).build();
    }


}
