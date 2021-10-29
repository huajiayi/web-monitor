import { ProjectOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Col, Menu, Row } from 'antd';
import React from 'react'
import {history} from 'umi';

const { SubMenu } = Menu;

const Layout: React.FC = (props: any) => {
  const paths = props.location.pathname.split('/');
  const selectedKeys = paths.length > 2 ? paths[2] : [];
  const showMenu = props.location.pathname !== '/project';

  const handleClick  = (e: any) => {
    history.push(`/project/${e.key}`, history.location.state);
  }
  
  return (
    <Row wrap={false} style={{marginTop: 24}}>
      {showMenu && (
        <Col>
          <Menu style={{width: 240}} mode="inline" selectedKeys={selectedKeys} onClick={handleClick}>
            <Menu.Item key="detail" icon={<ProjectOutlined/>}>详情</Menu.Item>
            <Menu.Item key="record" icon={<VideoCameraOutlined/>}>记录</Menu.Item>
          </Menu>
        </Col>
      )}
      <Col flex={1} style={{margin: '0 24px'}}>
        { props.children }
      </Col>
    </Row>
  )
}

export default Layout
