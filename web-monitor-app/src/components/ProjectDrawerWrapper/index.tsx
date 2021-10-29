import { createProject, updateProject } from '@/services/Project';
import { Project } from '@/services/typings'
import { Button, Drawer, Row, Space, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import NumberInput from '../NumberInput';

interface ProjectDrawerWrapperProps {
  type: 'add' | 'edit';
  initialValues?: Project;
  onSuccess?: (value: Project) => void;
}

const ProjectDrawerWrapper: React.FC<ProjectDrawerWrapperProps> = ({type, initialValues, onSuccess, children}) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const submit = async (value: Project) => {
    let isSuccess;
    if(type === 'add') {
      isSuccess = await createProject(value);
    } else {
      isSuccess = await updateProject({
        id: initialValues?.id,
        ...value
      });
    }

    if(isSuccess) {
      message.success('操作成功');
      onSuccess?.(value);
      setVisible(false);
    }
  }

  return (
    <div onClick={e => e.stopPropagation()}>
      <div onClick={() => {
        setVisible(true);
      }}>{children}</div>
      <Drawer
        title={
          <Row justify="space-between">
            {type === 'add' ? '新建项目' : '编辑项目'}
            <Space>
              <Button onClick={() => setVisible(false)}>取消</Button>
              <Button onClick={form.submit} type="primary">
                确定
              </Button>
            </Space>
          </Row>
        }
        width={720}
        visible={visible}
        closeIcon={null}
        onClose={(e) => {
          e.stopPropagation();
          setVisible(false);
        }}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical" 
          initialValues={{imageUrl: 'https://img2.baidu.com/it/u=3096969667,612813214&fm=26&fmt=auto', recordTime: 1, ...initialValues}}
          onFinish={submit}
          autoComplete="off"
          >
          <Form.Item name="imageUrl" label="项目图片（暂不支持上传）" required>
            <img src={initialValues?.imageUrl ?? 'https://img2.baidu.com/it/u=3096969667,612813214&fm=26&fmt=auto'} alt="" />
          </Form.Item>
          <Form.Item name="name" label="项目名称" rules={[{required: true, whitespace: true, message: "请输入项目名称"}]} required>
            <Input />
          </Form.Item>
          <Form.Item name="address" rules={[{required: true, whitespace: true, message: "请输入项目地址"}]} label="项目地址" required>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="项目描述">
            <Input />
          </Form.Item>
          <Form.Item name="recordTime" rules={[{required: true, message: "请输入录制时间"}]} label="录制时间（最长录制时间，具体以实际为准）" required>
            <NumberInput min={1} max={5} suffix="分钟"/>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default ProjectDrawerWrapper;
