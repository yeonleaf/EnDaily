package example.endaily.dto;

import example.endaily.domain.Expression;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class ExpressionDTO {
    private Long id;
    private String word;
    private String meaning;
    private String exLine;
    private String myLine;

    public ExpressionDTO(Expression expression) {
        this.id = expression.getId();
        this.word = expression.getWord();
        this.meaning = expression.getMeaning();
        this.exLine = expression.getExLine();
        this.myLine = expression.getMyLine();
    }
}
