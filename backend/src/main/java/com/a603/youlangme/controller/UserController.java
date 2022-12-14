package com.a603.youlangme.controller;

import com.a603.youlangme.advice.exception.UserNotFoundException;
import com.a603.youlangme.aop.LoginUser;
import com.a603.youlangme.cache.Grass;
import com.a603.youlangme.dto.ranking.LanguageResponseDto;
import com.a603.youlangme.dto.ranking.RankLogResponseDto;
import com.a603.youlangme.dto.user.*;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.repository.UserExpRepository;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.ManyResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.service.UserExpService;
import com.a603.youlangme.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserExpService userExpService;
    private final ResponseService responseService;


    // 유저 정보 조회 (유저 테이블)
    @GetMapping("/{id}")
    public OneResult<UserEntireInfoResponseDto> getEntireInfo(@PathVariable("id") Long id) {

        User user = userService.findUserById(id);
        if(user==null) throw new UserNotFoundException();
        return responseService.getOneResult(new UserEntireInfoResponseDto(user));
    }

    // 로그인 유저 정보 조회 (유저 테이블)
    @GetMapping("/login-user")
    public OneResult<UserLoginUserResponseDto> loadLoginUserInfo() {
        // 로그인 유저 가져오기
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        return responseService.getOneResult(new UserLoginUserResponseDto(loginUser));
    }


    // 이메일 중복 체크
    @GetMapping("/check-email")
    public CommonResult checkEmail(@RequestParam("email") String emailToCheck) {
        User user = userService.findUserByEmail(emailToCheck);

        // 있으면(중복이면) true
        return responseService.getOneResult(user!=null);
    }

    // 이름 중복 체크
    @GetMapping("/check-name")
    public CommonResult checkName(@RequestParam("name") String nameToCheck) {
        User user = userService.findUserByName(nameToCheck);

        // 있으면(중복이면) true
        return responseService.getOneResult(user!=null);
    }

    // 사용자 기본 정보 저장
    @PutMapping("/basic-info")
    public CommonResult setBasicInfo(@RequestBody UserSetBasicInfoRequestDto userSetBasicInfoRequestDto){

        // 로그인 유저 가져오기
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        userService.updateBasicInfo(loginUser.getId(), userSetBasicInfoRequestDto);

        return responseService.getSuccessResult();
    }

    // Profile Start

    @GetMapping("/description/{id}") // Read

    public OneResult<String> getUserDescription (@PathVariable(value ="id") Long userId) {
        return responseService.getOneResult(userService.readUserDescription(userId));
    }

    @PutMapping("/description") // Update
    public CommonResult setUserDescription (@RequestBody Map<String, String> descriptionMap) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();
        userService.updateUserDescription(loginUser.getId(), descriptionMap.get("description"));

        return responseService.getSuccessResult();
    }

//    @GetMapping("/image/{id}") // Read
//    public Resource getUserImage (@PathVariable(value = "id") Long userId) throws MalformedURLException {
//        System.out.println("=========1==========1============1=====");
//        String path = userService.readUserImage(userId);
//        File file = new File(path);
//        System.out.println("file:"+file.getPath());
//        return new UrlResource("file:"+file.getPath());
//    }

    @PutMapping("/image") // Update
    public OneResult<String> setUserImage (@RequestParam("imageFile") MultipartFile file) throws IOException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        return responseService.getOneResult(userService.updateUserImage(loginUser.getId(), file));
    }

    @GetMapping("/profile/{id}") // Read
    public OneResult<UserProfileResponseDto> getUserProfile (@PathVariable(value ="id") Long id) {
        UserProfileResponseDto userProfileResponseDto = userService.readUserProfile(id);
        return responseService.getOneResult(userProfileResponseDto);
    }

    @GetMapping("/level-detail/{id}")
    public CommonResult getUserLevelDetails(@PathVariable("id") Long id) {
        return responseService.getOneResult(userService.readUserLevelDetails(id));
    }

    @GetMapping("/language-stat/{id}")
    public CommonResult getUserLanguageStat(@PathVariable("id") Long id) {
        return responseService.getOneResult(userService.readUserLanguageStat(id));
    }


    // Profile End
    @GetMapping("/exp-level/{id}")
    public OneResult<UserExpLevelResponseDto> getExpAndLevelInfo(@PathVariable("id") Long id) {
        UserExpLevelResponseDto res = userExpService.getExpAndLevel(id);

        return responseService.getOneResult(res);
    }


    @GetMapping("/grass/{id}")
    public ManyResult<Grass> setGrass(@PathVariable(value = "id") Long id) throws ParseException {
        List<Grass>grassList=userService.setGrassList(id);
        return responseService.getManyResult(grassList);
    }

    @GetMapping("/langlist/{id}")
    public ManyResult<LanguageResponseDto> LanguageList(@PathVariable("id") Long id){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        return responseService.getManyResult(userService.TopLanguage(id));
    }

    @GetMapping("/ranklist/{id}") //각 id 추가
    public ManyResult<RankLogResponseDto>RankingList(@PathVariable("id")Long id){
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User user=((User)authentication.getPrincipal());
        return responseService.getManyResult(userService.RankList(id));

    }

}
