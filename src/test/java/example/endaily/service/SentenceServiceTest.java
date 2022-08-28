package example.endaily.service;

import example.endaily.domain.Member;
import example.endaily.domain.Sentence;
import example.endaily.dto.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Transactional
@SpringBootTest
class SentenceServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private SentenceService sentenceService;

    @Test
    public void saveOneWithExpressions_Test() throws Exception {
        //given
        /*member*/
        MemberDTO member = new MemberDTO("abc@test.ac.kr", "abc123!@#");

        memberService.save(member);

        Member findMember = memberService.findAll().get(0);

        /*ExpressionSaveDTO*/
        List<ExpressionSaveDTO> list = new ArrayList<>();
        list.add(make_exSaveDTO("a", "a", "a", "a"));
        list.add(make_exSaveDTO("b", "b", "b", "b"));
        list.add(make_exSaveDTO("c", "c", "c", "c"));
        list.add(make_exSaveDTO("d", "d", "d", "d"));

        /*MemberSentenceExpressionDTO*/
        MemberSentenceExpressionDTO mseDTO = make_mseDTO(findMember.getId(), "2022-08-19", "la", "ba", list);
        sentenceService.saveOneWithExpressions(mseDTO);

        //when
        //HashMap<SentenceDTO, List<ExpressionDTO>> result = sentenceService.findOneWithExpressionsToday(make_memberDateDTO(findMember.getId(), "2022-08-19"));

//        List<ExpressionDTO> expressionDTOList = new ArrayList<>();
//        for (Map.Entry<SentenceDTO, List<ExpressionDTO>> entry : result.entrySet()) {
//            expressionDTOList = entry.getValue();
//        }
//        //then
//        Assertions.assertThat(expressionDTOList.size()).isEqualTo(4);

    }

    private MemberSentenceExpressionDTO make_mseDTO(Long memberId, String date, String dictation, String answer, List<ExpressionSaveDTO> expressionSaveDTOList) {
        MemberSentenceExpressionDTO newDTO = new MemberSentenceExpressionDTO();
        newDTO.setMemberId(memberId);
        newDTO.setDate(date);
        newDTO.setDictation(dictation);
        newDTO.setAnswer(answer);
        newDTO.setExpressions(expressionSaveDTOList);
        return newDTO;
    }

    private ExpressionSaveDTO make_exSaveDTO(String word, String meaning, String myLine, String exLine) {
        ExpressionSaveDTO newDTO = new ExpressionSaveDTO();
        newDTO.setWord(word);
        newDTO.setMeaning(meaning);
        newDTO.setExLine(exLine);
        newDTO.setMyLine(myLine);
        return newDTO;
    }

    private MemberDateDTO make_memberDateDTO(Long memberId, String date) {
        MemberDateDTO memberDateDTO = new MemberDateDTO();
        memberDateDTO.setMemberId(memberId);
        memberDateDTO.setDate(date);
        return memberDateDTO;
    }
}