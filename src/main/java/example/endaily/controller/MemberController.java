package example.endaily.controller;

import example.endaily.domain.Member;
import example.endaily.dto.MemberDTO;
import example.endaily.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    public long login(@RequestBody MemberDTO memberDTO) {
        Member findMember;
        try {
            findMember = memberService.findOneByEmail(memberDTO.getEmail());
        } catch (EmptyResultDataAccessException eae) {
            return -1;
        }
        if (!findMember.getPassword().equals(memberDTO.getPassword())) {
            return -1;
        }
        return findMember.getId();
    }

}
