package com.joey.monitor.vo;

public interface ProjectVO {
    Integer getId();

    String getName();

    String getDescription();

    String getAddress();

    String getImageUrl();

    Integer getRecordTime();

    String getCreatedBy();

    Boolean getIsDefault();
}
