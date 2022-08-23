import { Col, Row, Button, Space, PageHeader } from 'antd';
import { blue } from '@ant-design/colors';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import "./Header.css"
import { Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  const [size, setSize] = useState(12);
  return <>
    <header className='header' >
      <Row gutter={[4, 16]}>
        <Col span={8} className="grid-1">
          <div className='bl-logo'>
            <span className="logo">Logo</span>
          </div>
        </Col>
        <Col span={8} className="grid-2">
          <nav className="menu">
            <ul>
              <li><Link to={'/'}>Trang chủ</Link></li>
              <li><Link to={'/launch'}>Hòm Quỹ</Link></li>
              <li><Link to={'/'}>Chợ tình thương</Link></li>
            </ul> 
          </nav>
        </Col>
        <Col span={8} className="grid-3">
          <div className="btn-login">
            <Button className="login">
              <Space size={size}>
                Authenticate <img src="https://res.cloudinary.com/dielvkumg/image/upload/v1660903783/IC_1_rxetca.png" alt="" />
              </Space>
            </Button>
          </div>
        </Col>
      </Row>
    </header>
  </>
};

export default Header;
