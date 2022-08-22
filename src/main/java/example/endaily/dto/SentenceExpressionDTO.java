package example.endaily.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SentenceExpressionDTO {
    private Long sentenceId;
    private String word;
    private String meaning;
    private String exLine;
    private String myLine;
}
