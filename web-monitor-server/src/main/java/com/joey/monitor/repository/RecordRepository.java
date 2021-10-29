package com.joey.monitor.repository;

import com.joey.monitor.entity.Record;
import com.joey.monitor.vo.RecordVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecordRepository extends JpaRepository<Record, Integer> {

    Page<Record> findAllByProjectId(Integer projectId, Pageable pageable);

    @Query(value =  "select events from record where id=?1", nativeQuery = true)
    String findEventsById(Integer id);

    Page<RecordVO> getDistinctAllByProjectId(Integer id, Pageable pageable);
}
