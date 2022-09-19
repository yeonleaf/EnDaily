package example.endaily.service;

import example.endaily.converter.StringToLocalDateConverter;
import example.endaily.domain.Expression;
import example.endaily.domain.Member;
import example.endaily.domain.Sentence;
import example.endaily.dto.ExpressionDTO;
import example.endaily.dto.MemberDateDTO;
import example.endaily.dto.MemberSentenceExpressionDTO;
import example.endaily.dto.SentenceDTO;
import example.endaily.repository.ExpressionRepository;
import example.endaily.repository.MemberRepository;
import example.endaily.repository.SentenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
public class SentenceService {

    private final MemberRepository memberRepository;
    private final SentenceRepository sentenceRepository;
    private final ExpressionRepository expressionRepository;


    /*
    * 등록
    * */
    public void saveOneWithExpressions(MemberSentenceExpressionDTO dto) {
        Member member = memberRepository.findOne(dto.getMemberId());
        /*sentence 저장 (expression update 이전)*/
        Sentence sentence = new Sentence(member, new StringToLocalDateConverter().convert(dto.getDate()), dto.getDictation(), dto.getAnswer());
        sentenceRepository.save(sentence);

        /*sentence 조회*/
        Sentence findOne = sentenceRepository.findOne(sentence.getId());

        /*dto에 있는 ExpressionSaveDTO를 순회하면서 Expression 객체를 새로 생성한 후 sentence를 넣어 저장*/
        Stream<Expression> expressionStream = dto.getExpressions().stream().map(expressionSaveDTO -> new Expression(findOne, expressionSaveDTO));
        expressionStream.forEach(expressionRepository::save);

        /*이 단계에서 expressionStream에 저장된 Expression들은 영속성 컨텍스트에 올라가 있는 상태인가? 그렇다면 저장된 Expressions들을 다시 조회해올 필요는 없다.*/

        /*저장된 Expressions들을 다시 조회해 오기*/
        List<Expression> findExpressions = expressionRepository.findExpressionsBySentenceId(findOne.getId());

        /*sentence의 expressions 갱신하기*/
        sentenceRepository.updateExpressions(findOne.getId(), findExpressions);
    }

    /*
    * 조회
    * */
    public Sentence fineOne(Long sentenceId) {
        return sentenceRepository.findOne(sentenceId);
    }

    public HashMap<String, List<ExpressionDTO>> findOneWithExpressionsToday(MemberDateDTO dto) {
        return sentenceRepository.findOneWithExpressionsToday(dto.getMemberId(), new StringToLocalDateConverter().convert(dto.getDate()));
    }

    public List<SentenceDTO> findSentencesForDate(MemberDateDTO dto) {
        return sentenceRepository.findSentencesForDate(dto);

    }

    /*
    * 수정
    * */
    public void update(SentenceDTO dto) {
        sentenceRepository.update(dto);
    }

    /*
    * 삭제
    * */
    public void delete(Long sentenceId) {
        /*sentenceId를 외래키로 가지고 있는 모든 expression 삭제*/
        expressionRepository.findExpressionsBySentenceId(sentenceId).stream().forEach(expression -> expressionRepository.delete(expression.getId()));

        /*sentence 삭제*/
        sentenceRepository.delete(sentenceId);
    }
}
