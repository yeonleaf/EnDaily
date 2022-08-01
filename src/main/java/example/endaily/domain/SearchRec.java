package example.endaily.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SearchRec {
    @Id
    @GeneratedValue
    @Column(name = "search_rec_id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String word;
    private String request;
    private LocalDate date;

    public SearchRec(Member member, String word, String request, LocalDate date) {
        this.member = member;
        this.word = word;
        this.request = request;
        this.date = date;
    }
}
