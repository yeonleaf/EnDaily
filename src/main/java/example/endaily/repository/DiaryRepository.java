package example.endaily.repository;
import example.endaily.domain.Diary;
import example.endaily.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;


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

    public Diary findOneByDate(Member member, LocalDate date) {
        List<Diary> result = em.createQuery("select d from Diary d where d.date = :date and d.member.id = :memberId", Diary.class)
                .setParameter("date", date)
                .setParameter("memberId", member.getId())
                .getResultList();
        if (result.isEmpty()) {
            return new Diary(member);
        } else {
            return result.get(0);
        }
    }

    public List<Diary> findAll() {
        return em.createQuery("select d from Diary d", Diary.class).getResultList();
    }

}
