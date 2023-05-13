package com.kids.SEB_main_030.global.scheduler;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.kindergarten.repository.KindergartenRepository;
import com.kids.SEB_main_030.global.place.service.PlaceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.StringReader;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class schedulerService {
    private final PlaceService placeService;
    private final KindergartenRepository kindergartenRepository;

    public schedulerService(PlaceService placeService, KindergartenRepository kindergartenRepository) {
        this.placeService = placeService;
        this.kindergartenRepository = kindergartenRepository;
    }

//    @Scheduled(fixedDelay = 2000000,initialDelay = 120000)//Method 타입은 무조건 void , 매개변수 사용 불가
    public void run() throws Exception {
        log.info("run schedulerService");
        List<Kindergarten>existKindergartens = kindergartenRepository.findAll();
        String newString=placeService.getResponse();
        List<Kindergarten>newKindergartens = new ArrayList<>();
        newKindergartens.addAll(parseResponse(newString));
        for (int i = 0; i < 4; i++) {
            try {
                System.out.println("Sleep 3s: "  + LocalDateTime.now());
                String nextList = placeService.nextResponse(newKindergartens);
                newKindergartens.addAll(parseResponse(nextList));
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        compareExistNew(existKindergartens,newKindergartens);
    }
    public void compareExistNew(List<Kindergarten>existKindergartens , List<Kindergarten>newKindergartens){
        List<String> comparePlaceId = newKindergartens.stream().map(Kindergarten::getPlaceId).collect(Collectors.toList());
        for (int i = 0; i < existKindergartens.size(); i++) {
            String existPlaceId=existKindergartens.get(i).getPlaceId();
            if(comparePlaceId.contains(existPlaceId))
            {
                //id가 존재하면 newKindergartens에서 삭제한다.

                newKindergartens.removeIf(kg->kg.getPlaceId().equals(existPlaceId));
            }else {
                //id가 존재하지 않으면 DB에서 삭제한다.
                Kindergarten findKindergarten = kindergartenRepository.findKindergartenByPlaceId(existPlaceId);
                kindergartenRepository.delete(findKindergarten);
            }
            //남은 newKindergartens는 새로운 kindergartens로 새로 추가해준다.
        }
        kindergartenRepository.saveAll(newKindergartens);
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
        for (int i = 0; i < kindergartenList.size(); i++) {
            log.info(kindergartenList.get(i).getPagetoken());
        }
        return kindergartenList;
    }
}
