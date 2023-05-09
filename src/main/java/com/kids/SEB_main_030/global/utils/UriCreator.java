package com.kids.SEB_main_030.global.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriCreator {
    public static URI createUri(String defaultUrl, long resourceId) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUrl + "/{resource-id}")
                .buildAndExpand(resourceId)
                .toUri();
    }

    public static URI createUri(String defaultUrl, long resourceId1, long resourceId2) {
        return UriComponentsBuilder
                .newInstance()
                .path(defaultUrl)
                .buildAndExpand(resourceId1, resourceId2)
                .toUri();
    }
}
