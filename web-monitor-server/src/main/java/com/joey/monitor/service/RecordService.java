package com.joey.monitor.service;

import com.joey.monitor.common.exception.DataException;
import com.joey.monitor.common.response.Result;
import com.joey.monitor.entity.Project;
import com.joey.monitor.entity.Record;
import com.joey.monitor.repository.RecordRepository;
import com.joey.monitor.repository.UserRepository;
import com.joey.monitor.vo.RecordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;

@Service
public class RecordService {

    @Autowired
    private AuditorAware auditorAware;

    @Autowired
    private RecordRepository recordRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * 过去分页的记录
     * @param pageNum
     * @param pageSize
     * @return
     */
    public Page<RecordVO> getPagedRecordsByProjectId(int projectId, int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by("date").descending());
        return recordRepository.getDistinctAllByProjectId(projectId, pageable);
    }

    /**
     * 获取记录详情
     * @param id
     * @return
     */
    public Record getRecord(int id) {
        if (!recordRepository.existsById(id)) {
            throw new DataException(Result.DATA_NOT_FOUND);
        }

        return recordRepository.findById(id).get();
    }

    /**
     * 获取记录详情
     * @param id
     * @return
             */
    public String getRecordEvents(int id) {
        if (!recordRepository.existsById(id)) {
            throw new DataException(Result.DATA_NOT_FOUND);
        }

        return recordRepository.findEventsById(id);
    }

    /**
     * 创建记录
     * @param record
     * @return
     */
    public Record createRecord(Record record) {
        if (null != record.getId() && recordRepository.existsById(record.getId())) {
            throw new DataException(Result.DATA_HAS_EXISTED);
        }

        return recordRepository.save(record);
    }

    /**
     * 编辑记录
     * @param record
     * @return
     */
    public Record updateRecord(Record record) {
        if (!recordRepository.existsById(record.getId())) {
            throw new DataException(Result.DATA_NOT_FOUND);
        }

        return recordRepository.save(record);
    }

    /**
     * 删除记录
     * @param id
     * @return
     */
    public void deleteRecord(int id) {
        recordRepository.findById(id).ifPresent(record -> {
            record.setIsDeleted(1);
            record.setUpdatedBy(auditorAware.getCurrentAuditor().get().toString());
            record.setUpdatedDate(new Date());
            recordRepository.save(record);
        });
    }
}
