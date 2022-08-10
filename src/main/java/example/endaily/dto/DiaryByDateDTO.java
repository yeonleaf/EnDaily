package example.endaily.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import java.time.LocalDate;

@NoArgsConstructor
@Getter @Setter
public class DiaryByDateDTO {
    @Nullable
    private LocalDate date;

    @Nullable
    private String content;

    @Nullable
    private String reference;
}
