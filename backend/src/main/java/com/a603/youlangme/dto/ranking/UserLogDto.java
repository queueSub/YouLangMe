package com.a603.youlangme.dto.ranking;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLogDto implements Serializable{

    private String myLanguage;

    private String yourLanguage;
}
