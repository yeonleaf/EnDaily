package example.endaily.controller;

import example.endaily.dto.*;
import example.endaily.service.SentenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sentence")
public class SentenceController {

    private final SentenceService sentenceService;

    @PostMapping
    public void save(@RequestBody MemberSentenceExpressionDTO dto) {
        sentenceService.saveOneWithExpressions(dto);
    }

    // @GetMapping("/sentences")
    public HashMap<String, List<ExpressionDTO>> findOneWithExpressionsToday(@RequestParam(name = "memberId") Long memberId, @RequestParam(name = "date") String date) {
        MemberDateDTO dto = new MemberDateDTO();
        dto.setMemberId(memberId);
        dto.setDate(date);
        return sentenceService.findOneWithExpressionsToday(dto);
    }

    @GetMapping("/sentences")
    public List<SentenceDTO> findSentencesForDate(@RequestParam(name = "memberId") Long memberId, @RequestParam(name = "date") String date) {
        MemberDateDTO dto = new MemberDateDTO();
        dto.setMemberId(memberId);
        dto.setDate(date);
        return sentenceService.findSentencesForDate(dto);
    }

}
