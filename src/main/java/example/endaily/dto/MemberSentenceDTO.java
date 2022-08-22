package example.endaily.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class MemberSentenceDTO {
    private Long memberId;
    private String date;
    private String dictation;
    private String answer;
}
