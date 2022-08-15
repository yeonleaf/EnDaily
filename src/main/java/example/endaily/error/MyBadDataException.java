package example.endaily.error;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class MyBadDataException extends RuntimeException {

    private HttpStatus status;

    public MyBadDataException(HttpStatus status) {
        this.status = status;
    }

}
