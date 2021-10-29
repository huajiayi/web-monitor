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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;
import java.util.Set;

@Setter
@Getter
@Accessors(chain = true)
@Entity(name = "project")
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "update project set is_deleted = 1 where id = ?")
@Where(clause = "is_deleted = 0")
public class Project {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @NotBlank(message = "名称不可为空")
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description = "";

    @NotBlank(message = "网址不可为空")
    @Pattern(regexp = "(((^https?:(?:\\/\\/)?)(?:[-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9.-]+(?::\\d+)?|(?:www.|[-;:&=\\+\\$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[\\+~%\\/.\\w-_]*)?\\??(?:[-\\+=&;%@.\\w_]*)#?(?:[\\w]*))?)$", message = "网址格式错误")
    @Column(name = "address")
    private String address;

    @NotBlank(message = "图片地址不可为空")
    @Column(name = "image_url")
    private String imageUrl;

    @NotNull(message = "录制时间不可为空")
    @Column(name = "record_time")
    private Integer recordTime;

    @Column(name = "is_default")
    private Boolean isDefault = false;

    @ManyToMany(mappedBy = "projects")
    @JsonIgnoreProperties({"projects"})
    private Set<User> users;

    @OneToOne
    @JsonIgnoreProperties({"projects"})
    private Config config;

    @OneToMany(mappedBy = "project")
    @JsonIgnoreProperties({"project"})
    private Set<Record> records;

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
