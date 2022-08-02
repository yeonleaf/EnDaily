package example.endaily.service;

import example.endaily.domain.Diary;
import example.endaily.repository.DiaryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public void save(Diary diary) {
        diaryRepository.save(diary);
    }

    public void remove(Diary diary) {
        diaryRepository.remove(diary);
    }

    public void findOneByDate(LocalDate localDate) {
        diaryRepository.findOneByDate(localDate);
    }

    /*날짜 기준으로 오름차순 정렬*/
    public List<Diary> findAllSortedByDate() {
        return diaryRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Diary::getDate))
                .collect(Collectors.toList());
    }
}
