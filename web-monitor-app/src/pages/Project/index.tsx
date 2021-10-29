import { createProject, deleteProject, getPagedProjects } from '@/services/Project';
import { useRequest, history } from 'umi';
import React, { useEffect } from 'react'
import { DeleteOutlined, EditOutlined, ExpandOutlined, HomeOutlined, PlusOutlined, } from '@ant-design/icons';
import { Card, Col, message, Modal, Row } from 'antd';
import styles from './index.less';
import ProjectDrawerWrapper from '@/components/ProjectDrawerWrapper';

export default (): React.ReactElement => {

  const {data, refresh} = useRequest(() => getPagedProjects({pageNum: 1, pageSize: 10000}));

  return (
    <>
      <Row style={{padding: 24}}>
        <Row gutter={[16, 16]}>
          <ProjectDrawerWrapper type="add" onSuccess={refresh}>
            <Row className={styles.createProject} justify="center" align="middle">
              <PlusOutlined style={{display: 'block', fontSize: 32}}/>
              <span style={{fontSize: 16, marginTop: 16}}>创建项目</span>
            </Row>
          </ProjectDrawerWrapper>
          {data?.content?.map(project => (
              <Col key={project.id} onClick={() => {
                history.push('/project/detail', project);
              }}>
                <Card
                  className={styles.card}
                  cover={
                    <img
                      style={{height: 135}}
                      src={project.imageUrl}
                    />
                  }
                  actions={[
                    <HomeOutlined key="home" style={{width: '100%', height: '100%'}} onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.address);
                    }} />,
                    <ProjectDrawerWrapper type="edit" initialValues={project} onSuccess={refresh}>
                      <EditOutlined style={{width: '100%', height: '100%'}} />
                    </ProjectDrawerWrapper>,
                    <DeleteOutlined key="delete" style={{width: '100%', height: '100%'}} onClick={(e) => {
                      e.stopPropagation();
                      Modal.confirm({
                        content: '删除后录像会一并删除，确定要删除吗？',
                        okText: '确定',
                        cancelText: '取消',
                        onOk: async () => {
                          const isSuccess = await deleteProject({id: project.id});
                          if(isSuccess) {
                            message.success('删除成功');
                            refresh();
                          }
                        }
                      })
                    }}/>,
                  ]}
                >
                  <Card.Meta
                    title={project.name}
                    description={project.address}
                  />
                </Card>
              </Col>
            ))}
        </Row>
      </Row>
    </>
  )
}