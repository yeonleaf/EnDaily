package example.endaily.controller;
import example.endaily.dto.RecordDTO;
import example.endaily.error.MyBadDataException;
import example.endaily.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/records")
    public List<RecordDTO> getRecords(@RequestParam(name = "memberId") Long memberId) {
        searchService.removeOldRecords(memberId);
        return searchService.findAll_desc(memberId);
    }

    @GetMapping("/word")
    public Mono<String> getWordMeaning(@RequestParam(name = "memberId") Long memberId, @RequestParam(name = "target") String target) {

        searchService.save(memberId, target);

        return WebClient.create().get()
                .uri("https://api.dictionaryapi.dev/api/v2/entries/en/" + target)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .onStatus(
                        HttpStatus.NOT_FOUND::equals,
                        response -> Mono.error(new MyBadDataException(HttpStatus.NOT_FOUND))
                )
                .bodyToMono(String.class);
    }
}
