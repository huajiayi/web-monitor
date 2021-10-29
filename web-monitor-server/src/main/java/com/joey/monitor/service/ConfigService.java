package com.joey.monitor.service;

import com.joey.monitor.common.exception.DataException;
import com.joey.monitor.common.response.Result;
import com.joey.monitor.entity.Config;
import com.joey.monitor.repository.ConfigRepository;
import com.joey.monitor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;

@Service
public class ConfigService {

    @Autowired
    private AuditorAware auditorAware;

    @Autowired
    private ConfigRepository configRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * 过去分页的配置
     * @param pageNum
     * @param pageSize
     * @return
     */
    public Page<Config> getPagedConfigs(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return configRepository.findAll(pageable);
    }

    /**
     * 获取配置详情
     * @param id
     * @return
     */
    public Config getConfig(int id) {
        if (!configRepository.existsById(id)) {
            throw new DataException(Result.DATA_NOT_FOUND);
        }

        return configRepository.findById(id).get();
    }

    /**
     * 创建配置
     * @param config
     * @return
     */
    public Config createConfig(Config config) {
        if (null != config.getId() && configRepository.existsById(config.getId())) {
            throw new DataException(Result.DATA_HAS_EXISTED);
        }

        return configRepository.save(config);
    }

    /**
     * 编辑配置
     * @param config
     * @return
     */
    public Config updateConfig(Config config) {
        if (!configRepository.existsById(config.getId())) {
            throw new DataException(Result.DATA_NOT_FOUND);
        }

        return configRepository.save(config);
    }

    /**
     * 删除配置
     * @param id
     * @return
     */
    public void deleteConfig(int id) {
        configRepository.findById(id).ifPresent(config -> {
            config.setIsDeleted(1);
            config.setUpdatedBy(auditorAware.getCurrentAuditor().get().toString());
            config.setUpdatedDate(new Date());
            configRepository.save(config);
        });
    }
}
