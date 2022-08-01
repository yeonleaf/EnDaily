package example.endaily.repository;

import example.endaily.domain.SearchRec;
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
public class SearchRecRepository {

    @PersistenceContext
    private final EntityManager em;

    public void save(SearchRec searchRec) {
        em.persist(searchRec);
    }

    /*오늘 기준으로 일 주일이 초과한 레코드를 삭제*/
    public void removePastRec() {
        LocalDate today = LocalDate.now();
        /*전체 조회*/
        List<SearchRec> beforeRemoval = findAll();

        /*필터 후 삭제*/
        beforeRemoval.stream().filter(searchRec -> Period.between(searchRec.getDate(), today).getDays() > 7).forEach(searchRec -> remove(searchRec));
    }

    public void remove(SearchRec searchRec) {
        em.remove(searchRec);
    }

    public List<SearchRec> findAll() {
        return em.createQuery("select sr from SearchRec sr", SearchRec.class).getResultList();
    }
}
