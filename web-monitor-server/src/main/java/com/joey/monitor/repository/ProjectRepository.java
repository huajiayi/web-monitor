package com.joey.monitor.repository;

import com.joey.monitor.entity.Project;
import com.joey.monitor.vo.ProjectVO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    boolean existsByName(String name);

    Page<ProjectVO> getDistinctAllBy(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "insert into project values(0, 'http://localhost:8000/project', '默认项目', 'admin', NOW(), 0, 'admin', NOW(), 'https://img2.baidu.com/it/u=3096969667,612813214&fm=26&fmt=auto', ?1, '这是默认项目（用于展示效果）', 1, 1)", nativeQuery = true)
    void createDefault(int configId);

    @Query(value = "select count(*) from project where id = 0", nativeQuery = true)
    int existsDefault();
}
