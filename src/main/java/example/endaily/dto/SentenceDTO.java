package example.endaily.dto;

import example.endaily.domain.Sentence;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter @Setter
public class SentenceDTO {
    private Long id;
    private LocalDate date;
    private String dictation;
    private String answer;

    public SentenceDTO(Sentence sentence) {
        this.id = sentence.getId();
        this.date = sentence.getDate();
        this.dictation = sentence.getDictation();
        this.answer = sentence.getAnswer();
    }
}
