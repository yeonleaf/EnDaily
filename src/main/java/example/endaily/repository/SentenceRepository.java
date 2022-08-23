package example.endaily.repository;

import example.endaily.domain.Expression;
import example.endaily.domain.Sentence;
import example.endaily.dto.ExpressionDTO;
import example.endaily.dto.ExpressionSaveDTO;
import example.endaily.dto.SentenceDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@Transactional
@RequiredArgsConstructor
public class SentenceRepository {
    private final EntityManager em;

    public void save(Sentence sentence) {
        em.persist(sentence);
    }

    public Sentence findOne(Long sentenceId) {
        return em.find(Sentence.class, sentenceId);
    }

    public HashMap<SentenceDTO, List<ExpressionDTO>> findOneWithExpressionsToday(Long memberId, LocalDate date) {

        HashMap<SentenceDTO, List<ExpressionDTO>> result = new HashMap<>();

        List<Sentence> resultList = em.createQuery("select distinct s from Sentence s join fetch s.expressions where s.member.id = :memberId and s.date = :date", Sentence.class)
                .setParameter("memberId", memberId)
                .setParameter("date", date)
                .getResultList();

        resultList.stream().forEach(sentence -> result.put(new SentenceDTO(sentence), sentence.getExpressions().stream().map(expression -> new ExpressionDTO(expression)).collect(Collectors.toList())));
        return result;
    }

    public Sentence findOneByDateAndMemberId(Long memberId, LocalDate date) {
        return em.createQuery("select s from Sentence s where s.member.id = :memberId and s.date = :date", Sentence.class)
                .setParameter("memberId", memberId)
                .setParameter("date", date)
                .setMaxResults(1)
                .getSingleResult();
    }

    public void updateExpressions(Long sentenceId, List<Expression> expressions) {
        Sentence sentence = findOne(sentenceId);
        sentence.updateExpressions(expressions);
    }
}
