import { Avatar, Col, Menu, Row } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import {history} from 'umi';

interface HeaderProps {
  
}

const Header: React.FC<HeaderProps> = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Row style={{height: 64, padding: '0 16px', boxShadow: '0 2px 8px #f0f1f2'}} align="middle" justify="space-between">
      <Col style={{cursor: 'pointer'}} onClick={() => history.push('/')}>
        Web监控平台
      </Col>
      <Col>
        {/* <Menu style={{display: 'inline-block'}} onClick={(e) => setSelectedKeys([e.key])} selectedKeys={selectedKeys} mode="horizontal">
          <Menu.Item key="mail">
            总览
          </Menu.Item>
          <Menu.Item key="mail">
            Navigation One
          </Menu.Item>
        </Menu> */}
        <Avatar style={{marginRight: 8}} icon={<UserOutlined />}/>
        游客
      </Col>
    </Row>
  )
}

export default Header
