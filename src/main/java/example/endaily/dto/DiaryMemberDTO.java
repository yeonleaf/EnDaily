package example.endaily.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DiaryMemberDTO {
    private long memberId;
    private LocalDate date;
    private String content;
    private String reference;
}
