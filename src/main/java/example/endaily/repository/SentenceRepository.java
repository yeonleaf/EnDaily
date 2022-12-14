package example.endaily.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import example.endaily.converter.StringToLocalDateConverter;
import example.endaily.domain.Expression;
import example.endaily.domain.Sentence;
import example.endaily.dto.ExpressionDTO;
import example.endaily.dto.ExpressionSaveDTO;
import example.endaily.dto.MemberDateDTO;
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

    /*
    * 등록
    * */
    public void save(Sentence sentence) {
        em.persist(sentence);
    }

    /*
    * 조회
    * */
    public Sentence findOne(Long sentenceId) {
        return em.find(Sentence.class, sentenceId);
    }

    public HashMap<String, List<ExpressionDTO>> findOneWithExpressionsToday(Long memberId, LocalDate date) {

        Gson gson = new Gson();

        HashMap<String, List<ExpressionDTO>> result = new HashMap<>();

        List<Sentence> resultList = em.createQuery("select distinct s from Sentence s join fetch s.expressions where s.member.id = :memberId and s.date = :date", Sentence.class)
                .setParameter("memberId", memberId)
                .setParameter("date", date)
                .getResultList();

        resultList.stream().forEach(sentence -> result.put(gson.toJson(new SentenceDTO(sentence)), sentence.getExpressions().stream().map(expression -> new ExpressionDTO(expression)).collect(Collectors.toList())));
        System.out.println("resultSize = " + result.size());
        return result;
    }

    public Sentence findOneByDateAndMemberId(Long memberId, LocalDate date) {
        return em.createQuery("select s from Sentence s where s.member.id = :memberId and s.date = :date", Sentence.class)
                .setParameter("memberId", memberId)
                .setParameter("date", date)
                .setMaxResults(1)
                .getSingleResult();
    }

    public List<SentenceDTO> findSentencesForDate(MemberDateDTO dto) {
        LocalDate date = new StringToLocalDateConverter().convert(dto.getDate());
        return em.createQuery("select s from Sentence s where s.member.id=:memberId and s.date=:date", Sentence.class)
                .setParameter("memberId", dto.getMemberId())
                .setParameter("date", date)
                .getResultList()
                .stream()
                .map(SentenceDTO::new)
                .collect(Collectors.toList());
    }

    /*
    * 수정
    * */
    public void updateExpressions(Long sentenceId, List<Expression> expressions) {
        Sentence sentence = findOne(sentenceId);
        sentence.updateExpressions(expressions);
    }

    public void update(SentenceDTO dto) {
        Sentence sentence = findOne(dto.getId());
        sentence.setDictation(dto.getDictation());
        sentence.setAnswer(dto.getAnswer());
    }

    /*
    * 삭제
    * */
    public void delete(Long sentenceId) {
        Sentence sentence = findOne(sentenceId);
        em.remove(sentence);
    }
}
