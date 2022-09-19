package example.endaily.domain;

import example.endaily.dto.ExpressionSaveDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@Entity
@RequiredArgsConstructor
public class Sentence {

    @Id
    @GeneratedValue
    @Column(name = "sentence_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "sentence")
    private List<Expression> expressions = new ArrayList<>();

    private LocalDate date;

    private String dictation;

    private String answer;

    public Sentence(Member member, LocalDate date, String dictation, String answer) {
        this.member = member;
        this.date = date;
        this.dictation = dictation;
        this.answer = answer;
        this.expressions = new ArrayList<>();
    }

    public void updateExpressions(List<Expression> expressions) {
        this.expressions = expressions;
    }
}
