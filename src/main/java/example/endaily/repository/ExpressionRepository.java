package example.endaily.repository;

import example.endaily.domain.Expression;
import example.endaily.dto.MyLineDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class ExpressionRepository {

    private final EntityManager em;

    public void save(Expression expression) {
        em.persist(expression);
    }

    public Expression findOne(Long expressionId) {
        return em.find(Expression.class, expressionId);
    }

    public void setMyLine(MyLineDTO dto) {
        Expression expression = findOne(dto.getId());
        expression.setMyLine(dto.getMyLine());
    }

    public List<Expression> findExpressionsBySentenceId(Long sentenceId) {
        return em.createQuery("select ex from Expression ex where ex.sentence.id = :sentenceId")
                .setParameter("sentenceId", sentenceId)
                .getResultList();
    }
}
