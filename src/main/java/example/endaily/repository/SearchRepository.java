package example.endaily.repository;

import example.endaily.domain.Record;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class SearchRepository {

    @PersistenceContext
    private final EntityManager em;

    /*
    * 기본 메서드
    * */
    public void save(Record record) {
        em.persist(record);
    }

    public void remove(Record record) {
        em.remove(record);
    }

    public List<Record> findAll() {
        return em.createQuery("select sr from Record sr", Record.class).getResultList();
    }

    /*
    * 활용 메서드
    * */
    /*모든 레코드를 삭제*/
    public void removeAll() {
        List<Record> all = findAll();
        all.stream().forEach(record -> remove(record));
    }

    /*오늘 기준으로 일 주일이 초과한 레코드를 삭제*/
    public void removePastRec() {
        LocalDate today = LocalDate.now();
        /*전체 조회*/
        List<Record> beforeRemoval = findAll();

        /*필터 후 삭제*/
        beforeRemoval.stream().filter(record -> Period.between(record.getDate(), today).getDays() > 7).forEach(record -> remove(record));
    }


}
