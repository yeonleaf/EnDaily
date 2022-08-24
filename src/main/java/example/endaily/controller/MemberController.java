package example.endaily.controller;

import example.endaily.domain.Member;
import example.endaily.dto.MemberDTO;
import example.endaily.error.CustomValidationError;
import example.endaily.error.FieldErrMsg;
import example.endaily.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public ResponseEntity join(@Valid @RequestBody MemberDTO memberDTO, BindingResult bindingResult) {

        List<Member> memberList = memberService.findOneByEmail_NoException(memberDTO.getEmail());
        if (memberList.size() == 1) {
            bindingResult.addError(new FieldError("memberDTO", "email", "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요."));
        }

        if (bindingResult.hasErrors()) {
            return createResponseError(bindingResult);
        }

        memberService.save(memberDTO);
        return new ResponseEntity(memberDTO, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody MemberDTO memberDTO, BindingResult bindingResult) {

        List<Member> memberList = memberService.findOneByEmail_NoException(memberDTO.getEmail());
        if (memberList.isEmpty()) {
            bindingResult.addError(new FieldError("memberDTO", "email", "가입되지 않았거나 틀린 이메일입니다."));
            return createResponseError(bindingResult);
        }
        Member findMember = memberList.get(0);
        if (!findMember.getPassword().equals(memberDTO.getPassword())) {
            bindingResult.addError(new FieldError("memberDTO", "password", "비밀번호가 틀렸습니다."));
        }
        if (bindingResult.hasErrors()) {
            return createResponseError(bindingResult);
        } else {
            return new ResponseEntity(findMember.getId(), HttpStatus.OK);
        }

    }

    private ResponseEntity createResponseError(BindingResult bindingResult) {
        CustomValidationError error = new CustomValidationError(LocalDateTime.now(), HttpStatus.BAD_REQUEST);
        AtomicInteger keyCount = new AtomicInteger();
        bindingResult.getAllErrors().stream().forEach(err -> {
            error.addMsgList(new FieldErrMsg(keyCount.getAndIncrement(), ((FieldError) err).getField(), err.getDefaultMessage()));
        });
        return new ResponseEntity(error, HttpStatus.BAD_REQUEST);
    }

    @GetMapping
    public MemberDTO getMember(@RequestParam(name = "email") String email) {
        return memberService.getMember(email);
    }
}
