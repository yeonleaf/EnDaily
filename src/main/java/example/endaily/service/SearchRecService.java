package example.endaily.service;

import example.endaily.domain.SearchRec;
import example.endaily.repository.SearchRecRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchRecService {

    private final SearchRecRepository searchRecRepository;

    public void save(SearchRec searchRec) {
        searchRecRepository.save(searchRec);
    }

    public void remove(SearchRec searchRec) {
        searchRecRepository.remove(searchRec);
    }

    public List<SearchRec> findAll() {
        return searchRecRepository.findAll();
    }

    public void removeAll() {
        searchRecRepository.removeAll();
    }

    public void removePastRec() {
        searchRecRepository.removePastRec();
    }

}
