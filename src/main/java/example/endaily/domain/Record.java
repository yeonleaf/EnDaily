package example.endaily.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Record {
    @Id
    @GeneratedValue
    @Column(name = "search_rec_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String word;
    private LocalDateTime datetime;

    public Record(Member member, String word, LocalDateTime datetime) {
        this.member = member;
        this.word = word;
        this.datetime = datetime;
    }
}
