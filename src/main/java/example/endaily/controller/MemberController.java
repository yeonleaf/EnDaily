package example.endaily.controller;

import example.endaily.domain.Member;
import example.endaily.dto.MemberDTO;
import example.endaily.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/join")
    public void join(@RequestBody MemberDTO memberDTO) {
        memberService.save(memberDTO);
    }

}
