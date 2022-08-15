package example.endaily.error;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(MyBadDataException.class)
    protected ResponseEntity<Object> handleMyBadDataException(MyBadDataException ex) {
        return buildResponseEntity(new ApiError("사전에 없는 단어입니다.", ex.getStatus()));
    }

    private ResponseEntity<Object> buildResponseEntity(ApiError error) {
        return new ResponseEntity<>(error, error.getStatus());
    }

}