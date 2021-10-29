package com.joey.monitor.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.Set;

@Setter
@Getter
@Accessors(chain = true)
@Entity(name = "user")
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "update user set is_deleted = 1 where id = ?")
@Where(clause = "is_deleted = 0")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @NotBlank(message = "名称不可为空")
    @Column(name="name")
    private String name;

    @ManyToMany
    @JoinTable(name="project_user",joinColumns = @JoinColumn(name ="project_id"),inverseJoinColumns = @JoinColumn(name="user_id"))
    @JsonIgnoreProperties({"users"})
    private Set<Project> projects;

    @Column(name="is_deleted")
    private Integer isDeleted = 0;

    @CreatedDate
    @Column(name = "created_date", updatable = false)
    private Date createdDate;

    @CreatedBy
    @Column(name = "created_by", updatable = false, length = 64)
    private String createdBy;

    @LastModifiedDate
    @Column(name = "updated_date")
    private Date updatedDate;

    @LastModifiedBy
    @Column(name = "updated_by", length = 64)
    private String updatedBy;
}
