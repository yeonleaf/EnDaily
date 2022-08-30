package example.endaily.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class RecordDTO {
    private Long id;
    private LocalDateTime datetime;
    private String word;

    public RecordDTO(Long id, LocalDateTime datetime, String word) {
        this.id = id;
        this.datetime = datetime;
        this.word = word;
    }
}
