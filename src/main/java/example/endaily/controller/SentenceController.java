package example.endaily.controller;

import example.endaily.domain.Expression;
import example.endaily.domain.Sentence;
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
        System.out.println("dto.getMemberId() = " + dto.getMemberId());
        sentenceService.saveOneWithExpressions(dto);
    }

    @GetMapping("/sentences")
    public HashMap<Sentence, List<ExpressionDTO>> findOneWithExpressionsToday(@RequestBody MemberDateDTO dto) {
        return sentenceService.findOneWithExpressionsToday(dto);
    }
}
