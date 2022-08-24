package example.endaily.error;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FieldErrMsg {
    private int keyCnt;
    private String field;
    private String errMsg;

    public FieldErrMsg(int keyCnt, String field, String errMsg) {
        this.keyCnt = keyCnt;
        this.field = field;
        this.errMsg = errMsg;
    }
}
