package example.endaily.repository;

import example.endaily.domain.Diary;
import example.endaily.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@Transactional
@SpringBootTest
class DiaryRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DiaryRepository diaryRepository;

    @Test
    public void save_Test() throws Exception {
        //given
        Member member = new Member("test@abc.co.kr", "123456");

        //when
        memberRepository.save(member);
        Diary diary = new Diary(member, LocalDate.now(), "https://www.youtube.com/shorts/YaLctLXJVw4", "I am sam. What's your name?");

        diaryRepository.save(diary);

        //then
        // Assertions.assertThat(diaryRepository.findOneByDate(LocalDate.now())).isNotNull();
        Assertions.assertThat(diaryRepository.findOneByDate(LocalDate.now()).getMember().getEmail()).isEqualTo("test@abc.co.kr");
    }

    @Test()
    public void remove_Test() throws Exception {
        //given
        Member member = new Member("test@abc.co.kr", "123456");
        memberRepository.save(member);
        Diary diary = new Diary(member, LocalDate.now(), "https://www.youtube.com/shorts/YaLctLXJVw4", "I am sam. What's your name?");
        diaryRepository.save(diary);

        //when
        diaryRepository.remove(diary);

        //then
        assertThrows(EmptyResultDataAccessException.class, () -> {
            diaryRepository.findOneByDate(LocalDate.now());
        });
    }

    @Test
    public void findOneByDate_Test() throws Exception {
        //given
        Member member = new Member("test@abc.co.kr", "123456");
        memberRepository.save(member);

        Diary diary1 = new Diary(member, LocalDate.now(), "1", "I am sam. What's your name?");
        Diary diary2 = new Diary(member, LocalDate.now().plusDays(1), "2", "I am sam. What's your name?");
        Diary diary3 = new Diary(member, LocalDate.now().plusDays(2), "3", "I am sam. What's your name?");

        //when
        diaryRepository.save(diary1);
        diaryRepository.save(diary2);
        diaryRepository.save(diary3);

        //then
        Assertions.assertThat(diaryRepository.findOneByDate(LocalDate.now()).getReference()).isEqualTo("1");
    }

    @Test
    public void findAllSortedByDate_Test() throws Exception {
        //given
        Member member = new Member("test@abc.co.kr", "123456");
        memberRepository.save(member);

        Diary diary1 = new Diary(member, LocalDate.now(), "2", "I am sam. What's your name?");
        Diary diary2 = new Diary(member, LocalDate.now().plusDays(1), "1", "I am sam. What's your name?");
        Diary diary3 = new Diary(member, LocalDate.now().plusDays(2), "3", "I am sam. What's your name?");

        //when
        diaryRepository.save(diary2);
        diaryRepository.save(diary1);
        diaryRepository.save(diary3);

        //then
//        String result = diaryRepository.findAllSortedByDate().stream().map(Diary::getReference).collect(Collectors.joining(","));
//        Assertions.assertThat(result).isEqualTo("2,1,3");
    }
}