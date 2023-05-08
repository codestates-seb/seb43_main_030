package com.kids.SEB_main_030.utils;

import com.kids.SEB_main_030.profile.entity.Profile;
import com.kids.SEB_main_030.profile.repository.ProfileRepository;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class RandomCreator {
    private final String[] Adjectives = {"행복한", "희망찬", "성실한", "기쁨가득한", "즐기운", "상쾌한", "당당한", "똑똑한", "밝은"};
    private final String[] Nouns = {"주인", "집사", "오너", "캔디", "우두머리", "귀요미", "훈이", "짱구", "짱아", "신형만", "맹구", "철수"};
    private final ProfileRepository profileRepository;

    public RandomCreator(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public String initName(){
        Random random = new Random();
        String adjective = Adjectives[random.nextInt(Adjectives.length)];
        String noun = Nouns[random.nextInt(Nouns.length)];
        int number = random.nextInt(1000);
        return String.format("%s%s%d", adjective, noun, number);
    }

    public Profile initProfile(){
        Profile profile = new Profile();
        profile.setType(Profile.type.PERSON);
        profile.setName(initName());
        return profileRepository.save(profile);
    }
}
