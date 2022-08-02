package example.endaily.repository;

import example.endaily.domain.Diary;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
@RequiredArgsConstructor
public class DiaryRepository {

    @PersistenceContext
    private final EntityManager em;

    public void save(Diary diary) {
        em.persist(diary);
    }

    public void remove(Diary diary) {
        em.remove(diary);
    }

    public Diary findOneByDate(LocalDate date) {
        return em.createQuery("select d from Diary d where d.date = :date", Diary.class)
                .setParameter("date", date)
                .getSingleResult();
    }

    public List<Diary> findAll() {
        return em.createQuery("select d from Diary d", Diary.class).getResultList();
    }

}
