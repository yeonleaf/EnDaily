package example.endaily.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ExpressionsByDateDTO {
    private Long memberId;
    private LocalDate date;
}
