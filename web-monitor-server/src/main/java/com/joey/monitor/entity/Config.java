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
import java.util.List;

@Setter
@Getter
@Accessors(chain = true)
@Entity(name = "config")
@EntityListeners(AuditingEntityListener.class)
@SQLDelete(sql = "update config set is_deleted = 1 where id = ?")
@Where(clause = "is_deleted = 0")
public class Config {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    @Column(name = "checkout_every_nth")
    private Integer checkoutEveryNth;

    @Column(name = "checkout_every_nms")
    private Integer checkoutEveryNms;

    @Column(name = "block_class")
    private String blockClass;

    @Column(name = "block_selector")
    private String blockSelector;

    @Column(name = "ignore_class")
    private String ignoreClass;

    @Column(name = "mask_text_class")
    private String maskTextClass;

    @Column(name = "mask_text_selector")
    private String maskTextSelector;

    @Column(name = "mask_all_inputs")
    private Boolean maskAllInputs;

    @Column(name = "mask_input_options")
    private String maskInputOptions;

    @Column(name = "mask_input_fn")
    private String maskInputFn;

    @Column(name = "mask_text_fn")
    private String maskTextFn;

    @Column(name = "slim_dom_options")
    private String slimDOMOptions;

    @Column(name = "inline_stylesheet")
    private Boolean inlineStylesheet;

    @Column(name = "hooks")
    private String hooks;

    @Column(name = "pack_fn")
    private String packFn;

    @Column(name = "sampling")
    private String sampling;

    @Column(name = "record_canvas")
    private Boolean recordCanvas;

    @Column(name = "collect_fonts")
    private Boolean collectFonts;

    @Column(name = "record_log")
    private Boolean recordLog;

    @Column(name = "user_triggered_on_input")
    private Boolean userTriggeredOnInput;

    @OneToOne(mappedBy = "config")
    @JsonIgnoreProperties({"config"})
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
