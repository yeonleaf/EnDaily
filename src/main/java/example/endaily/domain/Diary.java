package example.endaily.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class Diary {
    @Id
    @GeneratedValue
    @Column(name = "diary_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Nullable
    private LocalDate date;

    @Nullable
    private String reference;

    @Nullable
    private String content;

    public Diary(Member member, LocalDate date, String reference, String content) {
        this.member = member;
        this.date = date;
        this.reference = reference;
        this.content = content;
    }

    public Diary(Member member) {
        this.member = member;
        this.date = null;
        this.reference = null;
        this.content = null;
    }

}
