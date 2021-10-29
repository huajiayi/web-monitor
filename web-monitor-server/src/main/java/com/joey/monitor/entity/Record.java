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
import java.util.Date;
import java.util.Set;

@Setter
@Getter
@Accessors(chain = true)
@Entity(name = "record")
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "update record set is_deleted = 1 where id = ?")
@Where(clause = "is_deleted = 0")
public class Record {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(name="events", columnDefinition = "LONGTEXT")
    private String events;

    @Column(name = "date")
    private Date date;

    @Column(name = "url")
    private String url;

    @Column(name = "message")
    private String message;

    @ManyToOne
    @JoinColumn(name="projectId")
    @JsonIgnoreProperties({"records"})
    private Project project;

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
