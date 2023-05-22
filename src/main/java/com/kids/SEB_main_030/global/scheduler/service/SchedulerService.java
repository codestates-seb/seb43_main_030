package com.kids.SEB_main_030.global.scheduler.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.kindergarten.repository.KindergartenRepository;
import com.kids.SEB_main_030.domain.review.entity.Review;
import com.kids.SEB_main_030.global.exception.CustomException;
import com.kids.SEB_main_030.global.exception.LogicException;
import com.kids.SEB_main_030.global.place.service.PlaceService;
import jdk.jshell.Snippet;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Slf4j
@Service
@RequiredArgsConstructor
public class SchedulerService {
    private final PlaceService placeService;
    private final KindergartenRepository kindergartenRepository;



    //@Scheduled(fixedDelay = 2000000,initialDelay = 120000)//Method 타입은 무조건 void , 매개변수 사용 불가
    public void mainService() throws Exception {
        log.info("run Scheduler");
        run();
    }
    public void run() throws Exception {
        List<Kindergarten>existKindergartens = kindergartenRepository.findAll();
        List<Kindergarten>newKindergartens = new ArrayList<>();
        getNew(newKindergartens);
        compareExistNew(existKindergartens,newKindergartens);
    }

    public void getNew(List<Kindergarten>newKindergartens) throws Exception {
        newKindergartens.addAll(parseResponse(placeService.getResponse("https://maps.googleapis.com/maps/api/place/textsearch/json?query=서울%강아지%유치원&key=AIzaSyDyUD-bsn1TOZi1m7I61_T30l9ISKGsR08")));
        while(true) {
            placeService.delayTime();
            String nextList = placeService.nextResponse(newKindergartens);
            if(nextList.contains("INVALID_REQUEST"))
                break;
            newKindergartens.addAll(parseResponse(nextList));
        }
    }
    public void compareExistNew(List<Kindergarten>existKindergartens , List<Kindergarten>newKindergartens){
        List<String> comparePlaceId = newKindergartens.stream().map(Kindergarten::getPlaceId).collect(Collectors.toList());
        for (int i = 0; i < existKindergartens.size(); i++) {
            String existPlaceId=existKindergartens.get(i).getPlaceId();
            if(comparePlaceId.contains(existPlaceId))
            {
                updateExist(newKindergartens,existPlaceId);
                //id가 존재하면 newKindergartens에서 삭제한다.
                newKindergartens.removeIf(kg->kg.getPlaceId().equals(existPlaceId));
            }else {
                //id가 존재하지 않으면 DB에서 삭제한다.
                Kindergarten findKindergarten = kindergartenRepository.findKindergartenByPlaceId(existPlaceId);
                log.info(findKindergarten.getName()+"이 존재하지 않습니다 삭제합니다.");
                kindergartenRepository.delete(findKindergarten);
            }
            //남은 newKindergartens는 새로운 kindergartens로 새로 추가해준다.
        }
        kindergartenRepository.saveAll(newKindergartens);
    }
    public void updateExist(List<Kindergarten>newKindergartens,String placeId){
        Kindergarten existKindergarten = findVerifiedKindergarten(placeId);
        Kindergarten newKindergarten = new Kindergarten();
        if(existKindergarten!=null){
             newKindergarten= newKindergartens.stream().filter(k->k.getPlaceId().equals(placeId)).findFirst().orElse(null);
        }
        if(existKindergarten.getPlaceId().equals(newKindergarten.getPlaceId())){
            if(!existKindergarten.getName().equals(newKindergarten.getName())){
                log.info(existKindergarten.getName()+"의 이름이 "+newKindergarten.getName()+"으로 변환 됩니다. placeId는"+placeId);
                Optional.ofNullable(newKindergarten.getName()).ifPresent(name->existKindergarten.setName(name));
                kindergartenRepository.save(existKindergarten);
            }
            if(!newKindergarten.getLatitude().equals(existKindergarten.getLatitude())){
                log.info(existKindergarten.getName()+"의 경도가"+newKindergarten.getLatitude()+"으로 변환 됩니다. placeId는"+placeId);
                Optional.ofNullable(newKindergarten.getLatitude()).ifPresent(latitude->existKindergarten.setLatitude(latitude));
                kindergartenRepository.save(existKindergarten);
            }
            if(!newKindergarten.getLongitude().equals(existKindergarten.getLongitude())){
                log.info(existKindergarten.getName()+"의 위도가"+newKindergarten.getLongitude()+"으로 변환 됩니다. placeId는"+placeId);
                Optional.ofNullable(newKindergarten.getLongitude()).ifPresent(longitude->existKindergarten.setLongitude(longitude));
                kindergartenRepository.save(existKindergarten);
            }
        }
    }
    public Kindergarten findVerifiedKindergarten(String placeId){
        Kindergarten findKindergarten = kindergartenRepository.findKindergartenByPlaceId(placeId);

        return findKindergarten;
    }

    public List<Kindergarten>parseResponse(String response){
        log.info(response);
        List<Kindergarten> kindergartenList =new ArrayList<>();
        try{
            JsonParser jsonParser = new JsonParser();
            JsonReader reader = new JsonReader(new StringReader(response));
            reader.setLenient(true);

            JsonElement jsonElement = jsonParser.parse(reader);
            JsonObject jsonObject = jsonElement.getAsJsonObject();
            JsonArray resultArray = (JsonArray) jsonObject.get("results");
            for (int i = 0; i < resultArray.size(); i++) {
                Kindergarten kindergarten = placeService.getKindergarten(jsonObject, resultArray, i);
                kindergartenList.add(kindergarten);
            }
        }catch (Exception e)
        {
            e.printStackTrace();
        }
        return kindergartenList;
    }
}

