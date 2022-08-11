package example.endaily.service;

import example.endaily.domain.Record;
import example.endaily.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    public void save(Record record) {
        searchRepository.save(record);
    }

    public void remove(Record record) {
        searchRepository.remove(record);
    }

    public List<Record> findAll() {
        return searchRepository.findAll();
    }

    public void removeAll() {
        searchRepository.removeAll();
    }

    public void removePastRec() {
        searchRepository.removePastRec();
    }

}
