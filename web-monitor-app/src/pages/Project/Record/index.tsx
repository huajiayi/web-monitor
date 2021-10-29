import { useModel } from '@/.umi/plugin-model/useModel'
import RRWebPlayer from '@/components/RRWebPlayer'
import useProject from '@/hooks/useProject'
import { getPagedRecords } from '@/services/Project'
import { getRecord, getRecordEvents } from '@/services/Record'
import { Record } from '@/services/typings'
import { formatDateTime, withPaginationProps } from '@/utils/util'
import { FileTextOutlined } from '@ant-design/icons'
import { useAntdTable } from 'ahooks'
import { PaginatedParams } from 'ahooks/lib/useAntdTable'
import { Modal, Space, Table } from 'antd'
import React, { useState } from 'react'

export default (): React.ReactElement => {
  const {currProject} = useProject();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);

  const getTableData = (
    { current, pageSize }: PaginatedParams[0],
    formData: FormData,
  ): Promise<any> => {
    return getPagedRecords({
      projectId: currProject?.id ?? 0,
      pageNum: current,
      pageSize,
    }).then((res) => res?.data || {});
  };

  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 10,
    formatResult(data: any) {
      return {
        ...data,
        list: data.content,
        pageSize: data.numberOfElements,
        total: data.totalElements
      };
    }
  });
  withPaginationProps(tableProps);

  const { submit, reset } = search;

  const columns: any = [
    {
      title: '报错时间',
      dataIndex: 'date',
      render: formatDateTime
    },
    {
      title: '报错地址',
      dataIndex: 'url',
    },
    {
      title: '报错信息',
      dataIndex: 'message',
    },
    {
      title: '操作',
      dataIndex: 'option',
      fixed: 'right',
      render: (_: any, record: Record) => (
        <Space size="middle">
          <a
            key="detail"
            onClick={async () => {
              const result = await getRecordEvents({id: record.id});
              if(result) {
                setEvents(JSON.parse(result.data));
                setModalVisible(true);
              }
            }}
          >
            <Space size={5}>
              <FileTextOutlined />
              回放
            </Space>
          </a>
        </Space>
      ),
    },
  ];
  
  return (
    <div>
      <Table rowKey="id" columns={columns} {...tableProps} scroll={{x: 'max-content'}} />
      <Modal 
        title="回放（打开控制台可以看到录制时的log信息）"
        width={1070}
        footer={null}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        destroyOnClose
      >
        <RRWebPlayer events={events}/>
      </Modal>
    </div>
  )
}
