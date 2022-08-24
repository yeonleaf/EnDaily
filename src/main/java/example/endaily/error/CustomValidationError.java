package example.endaily.error;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class CustomValidationError extends CustomError {
    List<FieldErrMsg> msgList = new ArrayList<>();

    public CustomValidationError(LocalDateTime time, HttpStatus status) {
        super(time, status);
    }

    public void addMsgList(FieldErrMsg msg) {
        this.msgList.add(msg);
    }
}
