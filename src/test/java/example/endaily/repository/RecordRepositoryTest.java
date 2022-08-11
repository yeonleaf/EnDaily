package example.endaily.repository;

import example.endaily.domain.Member;
import example.endaily.domain.Record;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@SpringBootTest
@Transactional
class RecordRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private SearchRepository searchRepository;

    @Test
    public void save_Test() throws Exception {
        //given
        Member member = new Member("test@abc.co.kr", "123456");

        //when
        memberRepository.save(member);
        Record record = new Record(member, "apple", "apple_request", LocalDate.now());
        searchRepository.save(record);

        //then
        Assertions.assertThat(searchRepository.findAll().size()).isEqualTo(1);
    }

    @Test
    public void removePastRec_Test() throws Exception {
        //given
        Member member = new Member("test@abc.co.kr", "123456");

        //when
        memberRepository.save(member);
        Record record1 = new Record(member, "apple", "apple_request", LocalDate.now());
        Record record2 = new Record(member, "apple", "apple_request", LocalDate.now().minusDays(5));
        Record record3 = new Record(member, "apple", "apple_request", LocalDate.now().minusDays(7));
        Record record4 = new Record(member, "apple", "apple_request", LocalDate.now().minusDays(9));

        searchRepository.save(record1);
        searchRepository.save(record2);
        searchRepository.save(record3);
        searchRepository.save(record4);

        //then
        searchRepository.removePastRec();

        Assertions.assertThat(searchRepository.findAll().size()).isEqualTo(3);
    }
}