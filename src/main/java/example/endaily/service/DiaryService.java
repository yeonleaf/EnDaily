package example.endaily.service;

import example.endaily.domain.Diary;
import example.endaily.domain.Member;
import example.endaily.dto.DiaryMemberDTO;
import example.endaily.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final MemberService memberService;
    private final DiaryRepository diaryRepository;

    public void save(DiaryMemberDTO diaryMemberDTO) {
        Member member = memberService.findOne(diaryMemberDTO.getMemberId());
        Diary diary = new Diary(member, diaryMemberDTO.getDate(), diaryMemberDTO.getReference(), diaryMemberDTO.getContent());
        diaryRepository.save(diary);
    }

    public void remove(Diary diary) {
        diaryRepository.remove(diary);
    }

    public Diary findOneByDate(Long memberId, LocalDate localDate) {
        Member member = memberService.findOne(memberId);
        return diaryRepository.findOneByDate(member, localDate);
    }

    /*날짜 기준으로 오름차순 정렬*/
    public List<Diary> findAllSortedByDate() {
        return diaryRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Diary::getDate))
                .collect(Collectors.toList());
    }
}
