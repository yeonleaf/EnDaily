package example.endaily.repository;

import example.endaily.domain.Member;
import example.endaily.domain.SearchRec;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@SpringBootTest
@Transactional
class SearchRecRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private SearchRecRepository searchRecRepository;

    @Test
    public void save_Test() throws Exception {
        //given
        Member member = new Member("test@abc.co.kr", "123456");

        //when
        memberRepository.save(member);
        SearchRec searchRec = new SearchRec(member, "apple", "apple_request", LocalDate.now());
        searchRecRepository.save(searchRec);

        //then
        Assertions.assertThat(searchRecRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    public void removePastRec_Test() throws Exception {
        //given
        Member member = new Member("test@abc.co.kr", "123456");

        //when
        memberRepository.save(member);
        SearchRec searchRec1 = new SearchRec(member, "apple", "apple_request", LocalDate.now());
        SearchRec searchRec2 = new SearchRec(member, "apple", "apple_request", LocalDate.now().minusDays(5));
        SearchRec searchRec3 = new SearchRec(member, "apple", "apple_request", LocalDate.now().minusDays(7));
        SearchRec searchRec4 = new SearchRec(member, "apple", "apple_request", LocalDate.now().minusDays(9));

        searchRecRepository.save(searchRec1);
        searchRecRepository.save(searchRec2);
        searchRecRepository.save(searchRec3);
        searchRecRepository.save(searchRec4);

        //then
        searchRecRepository.removePastRec();

        Assertions.assertThat(searchRecRepository.findAll().size()).isEqualTo(3);
    }
}