package example.endaily.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import example.endaily.converter.StringToLocalDateConverter;
import example.endaily.domain.Diary;
import example.endaily.dto.DiaryByDateDTO;
import example.endaily.dto.DiaryMemberDTO;
import example.endaily.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.convert.Jsr310Converters;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import java.time.LocalDate;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/diary")
@RestController
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    @PostMapping("/save")
    public void save(@RequestBody DiaryMemberDTO diaryMemberDTO) {
        diaryService.save(diaryMemberDTO);
    }

    @GetMapping
    public DiaryByDateDTO getDiaryByDate(@RequestParam(name="memberId") Long memberId, @RequestParam(name = "date") String date) {
        Diary diary = diaryService.findOneByDate(memberId, Jsr310Converters.StringToLocalDateConverter.INSTANCE.convert(date));
        DiaryByDateDTO dto = new DiaryByDateDTO();
        dto.setDate(diary.getDate());
        dto.setReference(diary.getReference());
        dto.setContent(diary.getContent());
        return dto;
    }

}
