package example.endaily.repository;

import example.endaily.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SearchQueryRepository extends JpaRepository<Record, Long> {
    @Query(value = "select search_rec_id, datetime, word, member_id from record where member_id = :memberId and timestampdiff(day, datetime, :today) > 7", nativeQuery = true)
    public List<Record> findOldRecords(@Param(value = "memberId") Long memberId, @Param(value = "today") LocalDateTime today);
}
