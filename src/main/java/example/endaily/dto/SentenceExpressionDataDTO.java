package example.endaily.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class SentenceExpressionDataDTO {
    private Long id;
    private String dictation;
    private String answer;
    private List<ExpressionDTO> expressions;
}
