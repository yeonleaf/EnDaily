package example.endaily.domain;

import example.endaily.dto.ExpressionSaveDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Expression {
    @Id @GeneratedValue
    @Column(name = "expression_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sentence_id")
    private Sentence sentence;

    private String word;
    private String meaning;
    private String exLine;
    private String myLine;

    public Expression(Sentence sentence, ExpressionSaveDTO dto) {
        this.word = dto.getWord();
        this.sentence = sentence;
        this.meaning = dto.getMeaning();
        this.exLine = dto.getExLine();
        this.myLine = dto.getMyLine();
    }

}
