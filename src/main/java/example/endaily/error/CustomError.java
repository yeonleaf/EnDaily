package example.endaily.error;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@Setter
public class CustomError {
    private LocalDateTime time;
    private HttpStatus status;

    public CustomError(LocalDateTime time, HttpStatus status) {
        this.time = time;
        this.status = status;
    }
}
