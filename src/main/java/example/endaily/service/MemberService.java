package example.endaily.service;

import example.endaily.domain.Member;
import example.endaily.dto.MemberDTO;
import example.endaily.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public void save(MemberDTO memberDTO) {
        Member member = new Member(memberDTO.getEmail(), memberDTO.getPassword());
        memberRepository.save(member);
    }

    public Member findOne(Long memberId) {
        return memberRepository.findOne(memberId);
    }

    public Member findOneByEmail(String email) {
        return memberRepository.findOneByEmail(email);
    }

    public List<Member> findOneByEmail_NoException(String email) {
        return memberRepository.findOneByEmail_NoException(email);
    }

    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    public MemberDTO getMember(String email) {
        return new MemberDTO(memberRepository.findOneByEmail(email));
    }
}
