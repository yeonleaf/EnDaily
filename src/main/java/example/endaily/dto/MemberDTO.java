package example.endaily.dto;

import example.endaily.domain.Member;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter @Setter
public class MemberDTO {
    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 8, max = 32)
    private String password;

    public MemberDTO(Member member) {
        this.email = member.getEmail();
        this.password = member.getPassword();
    }

    public MemberDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
