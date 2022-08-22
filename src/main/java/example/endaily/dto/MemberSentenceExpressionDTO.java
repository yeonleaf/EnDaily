package example.endaily.dto;

import example.endaily.domain.Expression;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class MemberSentenceExpressionDTO {
    /*Member*/
    private Long memberId;
    private String date;

    /*Sentence*/
    private String dictation;
    private String answer;

    /*Expressions*/
    private List<ExpressionSaveDTO> expressions;
}
