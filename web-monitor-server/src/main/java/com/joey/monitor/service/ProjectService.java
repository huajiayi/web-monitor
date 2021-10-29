package com.joey.monitor.service;

import com.joey.monitor.common.exception.DataException;
import com.joey.monitor.common.response.Result;
import com.joey.monitor.dto.UserProjectDTO;
import com.joey.monitor.entity.Config;
import com.joey.monitor.entity.Project;
import com.joey.monitor.entity.Record;
import com.joey.monitor.repository.ProjectRepository;
import com.joey.monitor.repository.UserRepository;
import com.joey.monitor.vo.ProjectVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;

@Service
public class ProjectService {

    @Autowired
    private AuditorAware auditorAware;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ConfigService configService;

    @Autowired
    private RecordService recordService;

    /**
     * 获取分页的项目
     * @param pageNum
     * @param pageSize
     * @return
     */
    public Page<ProjectVO> getPagedProjects(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return projectRepository.getDistinctAllBy(pageable);
    }

    /**
     * 查询项目是否存在
     * @param id
     * @return
     */
    public boolean existsById(int id) {
        return projectRepository.existsById(id);
    }

    /**
     * 获取项目详情
     * @param id
     * @return
     */
    public Project getProject(int id) {
        if (!projectRepository.existsById(id)) {
            throw new DataException(Result.DATA_NOT_FOUND);
        }

        return projectRepository.findById(id).get();
    }

    /**
     * 创建项目
     * @param project
     * @return
     */
    public Project createProject(Project project) {
        if (projectRepository.existsByName(project.getName())) {
            throw new DataException(Result.DATA_HAS_EXISTED);
        }

        var defaultConfig = new Config()
                .setCheckoutEveryNth(-1)
                .setCheckoutEveryNms(-1)
                .setBlockClass("rr-block")
                .setBlockSelector("")
                .setIgnoreClass("rr-ignore")
                .setMaskTextClass("rr-mask")
                .setMaskTextSelector("")
                .setMaskAllInputs(false)
                .setMaskInputOptions("{\"password\": true}")
                .setMaskInputFn("")
                .setMaskTextFn("")
                .setSlimDOMOptions("{}")
                .setInlineStylesheet(true)
                .setHooks("{}")
                .setPackFn("")
                .setSampling("")
                .setRecordCanvas(false)
                .setCollectFonts(false)
                .setRecordLog(false)
                .setUserTriggeredOnInput(false);

        var createdConfig = configService.createConfig(defaultConfig);
        project.setConfig(createdConfig);
        return projectRepository.save(project);
    }

    /**
     * 编辑项目
     * @param project
     * @return
     */
    public Project updateProject(Project project) {
        if (!projectRepository.existsById(project.getId())) {
            throw new DataException(Result.DATA_NOT_FOUND);
        }

        return projectRepository.save(project);
    }

    /**
     * 删除项目
     * @param id
     * @return
     */
    public void deleteProject(int id) {
        projectRepository.findById(id).ifPresent(project -> {
            project.setIsDeleted(1);
            project.setUpdatedBy(auditorAware.getCurrentAuditor().get().toString());
            project.setUpdatedDate(new Date());
            projectRepository.save(project);
        });
    }

    /**
     * 项目添加用户
     * @param userId
     * @param projectId
     */
    public void addUser(Integer userId, Integer projectId) {
        userRepository.findById(userId).ifPresent((user) -> {
            projectRepository.findById(projectId).ifPresent((project) -> {
                user.setProjects(new HashSet<>() {
                    {
                        add(project);
                    }
                });
                userRepository.save(user);
            });
        });
    }

    /**
     * 修改项目的配置
     * @param projectId
     * @param config
     */
    public void updateConfig(Integer projectId, Config config) {
        projectRepository.findById(projectId).ifPresentOrElse(project -> {
            var savedConfig = project.getConfig();
            if(null == savedConfig) {
                var createdConfig = configService.createConfig(config);
                project.setConfig(createdConfig);
            } else {
                config.setId(savedConfig.getId());
                project.setConfig(config);
            }

            projectRepository.save(project);
        }, () -> {
            throw new DataException(Result.DATA_NOT_FOUND);
        });
    }

    public void addRecord(Integer projectId, Record record) {
        projectRepository.findById(projectId).ifPresentOrElse(project -> {
            record.setProject(project);
            recordService.createRecord(record);
        }, () -> {
            throw new DataException(Result.DATA_NOT_FOUND);
        });
    }
}
