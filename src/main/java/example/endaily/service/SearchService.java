package example.endaily.service;

import example.endaily.domain.Member;
import example.endaily.domain.Record;
import example.endaily.dto.RecordDTO;
import example.endaily.repository.MemberRepository;
import example.endaily.repository.SearchQueryRepository;
import example.endaily.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final MemberRepository memberRepository;
    private final SearchRepository searchRepository;
    private final SearchQueryRepository queryRepository;
    /*
    * 생성
    * */

    public void save(Long memberId, String word) {
        Member member = memberRepository.findOne(memberId);

        /*이미 검색했던 단어인지 찾기*/
        List<Record> alreadySearched = searchRepository.findOneByWord(memberId, word);
        System.out.println("alreadySearched.size() = " + alreadySearched.size());
        if (alreadySearched.isEmpty()) {
            /*검색했던 기록이 없음*/
            /*지금까지 저장되어 있는 레코드의 길이가 5인지 확인*/
            List<Record> records = findAll_asc(memberId);
            System.out.println("records.size() = " + records.size());
            if (records.size() >= 5) {
                Record oldRecord = records.get(0);
                remove(oldRecord);
            }
            Record record = new Record(member, word, LocalDateTime.now());
            searchRepository.save(record);

        } else {
            /*검색했던 기록이 있음 -> 레코드의 date를 업데이트하기*/
            Record record = alreadySearched.get(0);
            searchRepository.updateDate(record.getId());
        }
    }

    /*
    * 조회
    * */

    /*가장 오래된 레코드부터 조회*/
    public List<Record> findAll_asc(Long memberId) {
        List<Record> origin = searchRepository.findAll(memberId);
        return origin.stream().sorted(Comparator.comparing(Record::getDatetime)).collect(Collectors.toList());
    }

    /*가장 최근 레코드부터 조회*/
    public List<RecordDTO> findAll_desc(Long memberId) {
        List<Record> origin = searchRepository.findAll(memberId);
        Comparator<Record> reversedComparator = Comparator.comparing(Record::getDatetime).reversed();
        List<Record> sortedOrigin = origin.stream().sorted(reversedComparator).collect(Collectors.toList());
        return sortedOrigin.stream().map(record -> new RecordDTO(record.getId(), record.getDatetime(), record.getWord())).collect(Collectors.toList());
    }

    /*오래된 레코드 조회*/
    public List<Record> findOldRecords(Long memberId) {
        return queryRepository.findOldRecords(memberId, LocalDateTime.now());
    }

    /*
    * 삭제
    * */
    /*레코드 삭제*/
    public void remove(Record record) {
        searchRepository.remove(record);
    }

    /*오래된 레코드 조회 후 삭제(최근 일 주일 내의 레코드를 제외한 모든 레코드)*/
    public void removeOldRecords(Long memberId) {
        List<Record> oldRecords = findOldRecords(memberId);
        oldRecords.forEach(this::remove);
    }


}
