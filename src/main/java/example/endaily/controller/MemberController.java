package example.endaily.controller;

import example.endaily.domain.Member;
import example.endaily.dto.MemberDTO;
import example.endaily.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
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

    @PostMapping("/login")
    public boolean login(@RequestBody MemberDTO memberDTO) {
        System.out.println("memberDTO = " + memberDTO);
        Member findMember;
        try {
            findMember = memberService.findOneByEmail(memberDTO.getEmail());
        } catch (EmptyResultDataAccessException eae) {
            return false;
        }
        if (!findMember.getPassword().equals(memberDTO.getPassword())) {
            return false;
        }
        return true;
    }

}
