package com.kids.SEB_main_030.global.place.service;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonReader;

import com.kids.SEB_main_030.domain.community.service.CommunityService;
import com.kids.SEB_main_030.domain.kindergarten.entity.Kindergarten;
import com.kids.SEB_main_030.domain.kindergarten.repository.KindergartenRepository;
import com.kids.SEB_main_030.global.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.io.StringReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
public class PlaceService {
    private final KindergartenRepository kindergartenRepository;
    private final ImageService imageService;
    private final CommunityService communityService;


    public List<Kindergarten> getPlaces() throws Exception {
        List<Kindergarten> mapList = new ArrayList<>();
        mapList.addAll(parseResponse(getResponse("https://maps.googleapis.com/maps/api/place/textsearch/json?query=서울%강아지%유치원&key=AIzaSyDyUD-bsn1TOZi1m7I61_T30l9ISKGsR08")));
        while (true) {
            delayTime();
            String nextList = nextResponse(mapList);
            if (nextList.contains("INVALID_REQUEST"))
                break;
            mapList.addAll(parseResponse(nextList));
        }
        getDetail(mapList);
        return mapList;
    }

    public void delayTime() {
        try {
            log.info("3초");
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public String getResponse(String url) {
        OkHttpClient client = new OkHttpClient()
                .newBuilder()
                .build();

//        String customUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=서울%강아지%유치원&key=AIzaSyDyUD-bsn1TOZi1m7I61_T30l9ISKGsR08";
        Request request = new Request.Builder()
                .url(url)
                .build();

        try (Response response = client.newCall(request).execute()) {
            return response.body().string();
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public String nextResponse(List<Kindergarten> kindergartenList) throws Exception {
        OkHttpClient client = new OkHttpClient()
                .newBuilder()
                .build();
        String tempUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=서울%강아지%유치원&key=AIzaSyDyUD-bsn1TOZi1m7I61_T30l9ISKGsR08&pagetoken=";
        String pagetoken = kindergartenList.get(kindergartenList.size() - 1).getPagetoken();
        String url = tempUrl.concat(pagetoken);

        url = url.replaceAll("\"", "").trim();
        URL real = new URL(url);
        //log.info(String.valueOf(real));
        Request request = new Request.Builder()
                .url(real)
                .build();


        try (Response response = client.newCall(request).execute()) {
            return response.body().string();
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    //리팩터링 필요
    public List<Kindergarten> parseResponse(String response) {//gson 라이브러리 사용
        //log.info(response);
        List<Kindergarten> kindergartenList = new ArrayList<>();
        try {
            JsonParser jsonParser = new JsonParser();
            JsonReader reader = new JsonReader(new StringReader(response));
            reader.setLenient(true);

            JsonElement jsonElement = jsonParser.parse(reader);
            JsonObject jsonObject = jsonElement.getAsJsonObject();
            JsonArray resultArray = (JsonArray) jsonObject.get("results");
            for (int i = 0; i < resultArray.size(); i++) {
                Kindergarten kindergarten = getKindergarten(jsonObject, resultArray, i);
                //repository에 저장
                kindergartenList.add(kindergartenRepository.save(kindergarten));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return kindergartenList;
    }

    @NotNull
    public Kindergarten getKindergarten(JsonObject jsonObject, JsonArray resultArray, int i) {
        Kindergarten kindergarten = new Kindergarten();
        kindergarten.setPagetoken(String.valueOf(jsonObject.get("next_page_token")));

        JsonObject kindergartenObject = (JsonObject) resultArray.get(i);
        kindergarten.setPlaceId(String.valueOf(kindergartenObject.get("place_id")));
        kindergarten.setName(String.valueOf(kindergartenObject.get("name")));
        kindergarten.setLocations(String.valueOf(kindergartenObject.get("formatted_address")));

        JsonElement geometryElement = kindergartenObject.get("geometry");
        JsonElement locationElement = geometryElement.getAsJsonObject().get("location");
        String longitude = locationElement.getAsJsonObject().get("lng").getAsString();
        String latitude = locationElement.getAsJsonObject().get("lat").getAsString();

        kindergarten.setLongitude(Double.valueOf(longitude));
        kindergarten.setLatitude(Double.valueOf(latitude));
        kindergarten.setRatedReviewsAvg(0.0);
        kindergarten.setCommunity(communityService.setDefaultCommunity(kindergarten));
        kindergarten.setImageUrl(imageService.getDefaultKindergartenImage());

        return kindergarten;
    }

    public void getDetail(List<Kindergarten> mapList) {
        for (int i = 0; i < mapList.size(); i++) {
            String url = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDyUD-bsn1TOZi1m7I61_T30l9ISKGsR08&place_id=" + mapList.get(i).getPlaceId();
            url = url.replaceAll("\"", "").trim();
            String response = getResponse(url);
            detailParseResponse(mapList.get(i), response);
        }
    }

    public void detailParseResponse(Kindergarten kindergarten, String response) { //JSON 라이브러리 사용
        JSONObject jsonObject = new JSONObject(response);
        JSONObject resultObject = jsonObject.getJSONObject("result");
        if (resultObject.has("formatted_phone_number")) {
            String phoneNumber = resultObject.getString("formatted_phone_number");
            kindergarten.setPhoneNumber(phoneNumber);
        }
        if (resultObject.has("website")) {
            String snsUrl = resultObject.getString("website");
            kindergarten.setSnsUrl(snsUrl);
        }
        if(resultObject.has("website")||resultObject.has("formatted_phone_number"))
            kindergartenRepository.save(kindergarten);
    }
}
