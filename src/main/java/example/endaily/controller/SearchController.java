package example.endaily.controller;
import example.endaily.error.MyBadDataException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    @GetMapping("/word")
    public Mono<String> getWordMeaning(@RequestParam(name = "target") String target) {
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
