package example.endaily.repository;

import example.endaily.domain.Record;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class SearchRepository {

    private final EntityManager em;

    /*
    * 생성
    * */
    public void save(Record record) {
        em.persist(record);
    }


    /*
    * 조회
    * */
    public Record findOne(Long recordId) {
        return em.find(Record.class, recordId);
    }

    public List<Record> findOneByWord(Long memberId, String target) {
        return em.createQuery("select r from Record r where r.word = :target and r.member.id = :memberId", Record.class)
                .setParameter("target", target)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    public List<Record> findAll(Long memberId) {
        return em.createQuery("select r from Record r where r.member.id = :memberId")
                .setParameter("memberId", memberId)
                .getResultList();
    }


    /*
    * 변경
    * */
    public void updateDate(Long recordId) {
        Record record = findOne(recordId);
        record.setDatetime(LocalDateTime.now());
    }


    /*
    * 삭제
    * */
    public void remove(Record record) {
        em.remove(record);
    }


}
