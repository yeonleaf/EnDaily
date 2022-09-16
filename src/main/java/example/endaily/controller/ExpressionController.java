package example.endaily.controller;
import example.endaily.dto.ExpressionDTO;
import example.endaily.dto.MyLineDTO;
import example.endaily.dto.SentenceExpressionDTO;
import example.endaily.service.ExpressionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/expression")
public class ExpressionController {

    private final ExpressionService expressionService;

    @PostMapping
    public void save(@RequestBody SentenceExpressionDTO dto) {
        expressionService.save(dto);
    }

    @PatchMapping
    public void setExpressionMyLine(@RequestBody MyLineDTO dto) {
        expressionService.setMyLine(dto);
    }

    @PutMapping
    public void update(@RequestBody ExpressionDTO dto) {
        expressionService.update(dto);
    }

    @DeleteMapping
    public void deleteExpression(@RequestParam(name = "expressionId") Long expressionId) {
        expressionService.delete(expressionId);
    }
}
