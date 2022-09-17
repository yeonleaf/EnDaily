package example.endaily.service;

import example.endaily.domain.Expression;
import example.endaily.domain.Sentence;
import example.endaily.dto.*;
import example.endaily.repository.ExpressionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExpressionService {
    private final ExpressionRepository expressionRepository;
    private final SentenceService sentenceService;

    public void save(SentenceExpressionDTO dto) {
        Sentence sentence = sentenceService.fineOne(dto.getSentenceId());
        Expression expression = new Expression(sentence, makeExpressionSaveDTO(dto));
        expressionRepository.save(expression);
    }

    private ExpressionSaveDTO makeExpressionSaveDTO(SentenceExpressionDTO dto) {
        ExpressionSaveDTO newDTO = new ExpressionSaveDTO();
        newDTO.setWord(dto.getWord());
        newDTO.setMeaning(dto.getMeaning());
        newDTO.setExLine(dto.getExLine());
        newDTO.setMyLine(dto.getMyLine());
        return newDTO;
    }

    public void setMyLine(MyLineDTO dto) {
        expressionRepository.setMyLine(dto);
    }

    public void update(ExpressionDTO dto) {
        expressionRepository.update(dto);
    }

    public void delete(Long expressionId) {
        expressionRepository.delete(expressionId);
    }

    public List<ExpressionDTO> findExpressionsBySentenceId(Long sentenceId) {
        return expressionRepository.findExpressionsBySentenceId(sentenceId).stream().map(ExpressionDTO::new).collect(Collectors.toList());
    }
}
