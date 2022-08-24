package example.endaily.repository;

import example.endaily.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    public void save_Test() throws Exception {
        //given
        Member member = new Member("test@abc.co.kr", "123456");

        //when
        memberRepository.save(member);

        //then
        Assertions.assertThat(memberRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    public void findByEmail_Test() throws Exception {
//        //given
//        Member member = new Member("test@abc.co.kr", "123456");
//
//        //when
//        memberRepository.save(member);

        //then
        Assertions.assertThat(memberRepository.findOneByEmail("test@abc.co.kr").getPassword()).isEqualTo("123456");
    }
}