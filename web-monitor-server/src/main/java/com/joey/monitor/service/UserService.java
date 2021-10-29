package com.joey.monitor.service;

import com.joey.monitor.common.exception.DataException;
import com.joey.monitor.common.response.Result;
import com.joey.monitor.entity.User;
import com.joey.monitor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    @Autowired
    private AuditorAware auditorAware;
    
    @Autowired
    private UserRepository userRepository;

    /**
     * 过去分页的用户
     * @param pageNum
     * @param pageSize
     * @return
     */
    public Page<User> getPagedUsers(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        return userRepository.findAll(pageable);
    }

    /**
     * 获取用户详情
     * @param id
     * @return
     */
    public User getUser(int id) {
        if (!userRepository.existsById(id)) {
            throw new DataException(Result.DATA_NOT_FOUND);
        }

        return userRepository.findById(id).get();
    }

    /**
     * 创建用户
     * @param user
     * @return
     */
    public User createUser(User user) {
        if (userRepository.existsByName(user.getName())) {
            throw new DataException(Result.DATA_HAS_EXISTED);
        }

        return userRepository.save(user);
    }

    /**
     * 编辑用户
     * @param user
     * @return
     */
    public User updateUser(User user) {
        if (!userRepository.existsById(user.getId())) {
            throw new DataException(Result.DATA_NOT_FOUND);
        }

        return userRepository.save(user);
    }

    /**
     * 删除用户
     * @param id
     * @return
     */
    public void deleteUser(int id) {
        userRepository.findById(id).ifPresent(user -> {
            user.setIsDeleted(1);
            user.setUpdatedBy(auditorAware.getCurrentAuditor().get().toString());
            user.setUpdatedDate(new Date());
            userRepository.save(user);
        });
    }
}
