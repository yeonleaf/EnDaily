package example.endaily.service;

import example.endaily.domain.Member;
import example.endaily.domain.Record;
import example.endaily.dto.RecordDTO;
import example.endaily.repository.MemberRepository;
import example.endaily.repository.SearchRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class SearchServiceTest {
    @Autowired private MemberRepository memberRepository;

    @Autowired private SearchService searchService;
    @Autowired private SearchRepository searchRepository;

    @Test
    @DisplayName("apple - banana - peach - lemon")
    public void findAll_asc_test() throws Exception {
        //given
        Member member = new Member("abc@test.co.kr", "123456789");
        memberRepository.save(member);

        System.out.println("member.getEmail() = " + member.getEmail());

        Record record1 = new Record(member, "apple", LocalDateTime.now());
        Record record2 = new Record(member, "banana", LocalDateTime.now().plusMinutes(1));
        Record record3 = new Record(member, "peach", LocalDateTime.now().plusMinutes(2));
        Record record4 = new Record(member, "lemon", LocalDateTime.now().plusMinutes(3));

        searchRepository.save(record1);
        searchRepository.save(record2);
        searchRepository.save(record3);
        searchRepository.save(record4);

        //when
        List<Record> all_asc = searchService.findAll_asc(member.getId());
        System.out.println("all_asc.size() = " + all_asc.size());

        //then
        String result = all_asc.stream().map(record -> record.getWord()).collect(Collectors.joining(" "));
        Assertions.assertThat(result).isEqualTo("apple banana peach lemon");
    }

    @Test
    @DisplayName("lemon - peach - banana - apple")
    public void findAll_desc_test() throws Exception {
        //given
        Member member = new Member("abc@test.co.kr", "123456789");
        memberRepository.save(member);

        System.out.println("member.getEmail() = " + member.getEmail());

        Record record1 = new Record(member, "apple", LocalDateTime.now());
        Record record2 = new Record(member, "banana", LocalDateTime.now().plusMinutes(1));
        Record record3 = new Record(member, "peach", LocalDateTime.now().plusMinutes(2));
        Record record4 = new Record(member, "lemon", LocalDateTime.now().plusMinutes(3));

        searchRepository.save(record1);
        searchRepository.save(record2);
        searchRepository.save(record3);
        searchRepository.save(record4);

        //when
        List<RecordDTO> all_desc = searchService.findAll_desc(member.getId());

        //then
        String result = all_desc.stream().map(record -> record.getWord()).collect(Collectors.joining(" "));
        Assertions.assertThat(result).isEqualTo("lemon peach banana apple");
    }

    @Test
    @DisplayName("저장 공간이 없으면 가장 오래된 레코드를 삭제한 후 저장한다.")
    public void save_test() throws Exception {
        //given
        Member member = new Member("abc@test.co.kr", "123456789");
        memberRepository.save(member);

        System.out.println("member.getEmail() = " + member.getEmail());

        Record record1 = new Record(member, "grape", LocalDateTime.now().minusMinutes(1));
        Record record2 = new Record(member, "papaya", LocalDateTime.now().minusMinutes(4));
        Record record3 = new Record(member, "orange", LocalDateTime.now().minusMinutes(3));
        Record record4 = new Record(member, "lemon", LocalDateTime.now().minusMinutes(2));
        Record record5 = new Record(member, "banana", LocalDateTime.now().minusMinutes(1));
        Record record6 = new Record(member, "apple", LocalDateTime.now());


        Long memberId = member.getId();
        searchService.save(memberId, "grape");
        searchService.save(memberId, "papaya");
        searchService.save(memberId, "orange");
        searchService.save(memberId, "lemon");
        searchService.save(memberId, "banana");
        searchService.save(memberId, "apple");

        //when
        List<RecordDTO> records = searchService.findAll_desc(memberId);

        //then
        Assertions.assertThat(records.stream().map(RecordDTO::getWord).collect(Collectors.joining(" "))).isEqualTo("apple banana lemon orange papaya");
    }

    @Test
    @DisplayName("생성된 지 일 주일이 넘은 record를 조회한다.")
    public void findOldRecords_test() throws Exception {
        //given
        Member member = new Member("abc@test.co.kr", "123456789");
        memberRepository.save(member);

        Record record1 = new Record(member, "apple", LocalDateTime.now());
        Record record2 = new Record(member, "grape", LocalDateTime.now().minusDays(2));
        Record record3 = new Record(member, "papaya", LocalDateTime.now().minusDays(4));
        Record record4 = new Record(member, "orange", LocalDateTime.now().minusDays(6));
        Record record5 = new Record(member, "lemon", LocalDateTime.now().minusDays(8));

        searchRepository.save(record1);
        searchRepository.save(record2);
        searchRepository.save(record3);
        searchRepository.save(record4);
        searchRepository.save(record5);

        //then
        Assertions.assertThat(searchService.findOldRecords(member.getId()).size()).isEqualTo(1);
    }

    @Test
    @DisplayName("생성한 지 일 주일이 넘은 레코드를 삭제한다.")
    public void removeOldRecords_test() throws Exception {
        //given
        Member member = new Member("abc@test.co.kr", "123456789");
        memberRepository.save(member);

        Record record1 = new Record(member, "apple", LocalDateTime.now());
        Record record2 = new Record(member, "grape", LocalDateTime.now().minusDays(2));
        Record record3 = new Record(member, "papaya", LocalDateTime.now().minusDays(4));
        Record record4 = new Record(member, "orange", LocalDateTime.now().minusDays(6));
        Record record5 = new Record(member, "lemon", LocalDateTime.now().minusDays(8));

        searchRepository.save(record1);
        searchRepository.save(record2);
        searchRepository.save(record3);
        searchRepository.save(record4);
        searchRepository.save(record5);

        //when
        searchService.removeOldRecords(member.getId());

        //then
        Assertions.assertThat(searchService.findAll_desc(member.getId()).size()).isEqualTo(4);
    }

}