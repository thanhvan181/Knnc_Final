
import { Col, Row, Button, Space, PageHeader, Menu, Dropdown } from 'antd';
import { blue } from '@ant-design/colors';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import "./Header.css"
import { Link } from "react-router-dom";
import { knnc_backend } from "../../../../../declarations/knnc_backend"
import { Principal } from '@dfinity/principal';

type Props = {};

declare global {
  interface Window {
    ic: {
      plug: {
        requestConnect(): Promise<any>,
        isConnected(): Promise<boolean>,
        sessionManager: {
          sessionData: {
            principalId: Principal,
            accountId: string
          }
        },
        requestBalance(): Promise<[any]>
      }
    }
  }
}

const Header = (props: Props) => {
  const [principal, setPrincipal] = useState<Principal>()
  const [connected, setconnected] = useState(false)
  const [balance, setBalance] = useState(0)
  const loginWithPlug = async () => {
    let result = await window.ic.plug.requestConnect()
    let isConnected = await window.ic.plug.isConnected()
    if (isConnected) {
      setconnected(true)
      setPrincipal(window.ic.plug.sessionManager.sessionData.principalId)
      let balance = await window.ic.plug.requestBalance()
      // lay so ICP trong vi
      console.log(balance[0].amount);


      let createUser = await knnc_backend.createUser(await Principal.from(window.ic.plug.sessionManager.sessionData.principalId))
      try {
        console.log(createUser);
      } catch (error) {
        console.log("Admin");
      };
      let userInfo = await knnc_backend.getUserInfoByPrincipal(Principal.from(await window.ic.plug.sessionManager.sessionData.principalId))
      console.log(userInfo);

      // switch case o day
      switch (Object.getOwnPropertyNames(userInfo[0].role)[0].toString()) {
        case 'admin': {
          // admin thi lam j
          console.log("toi la admin");
          break;
        };
        case 'normal': {
          // nguoi binh thuong
          console.log("toi la nguoi bth");
          break;
        };
        case 'organization': {
          // to chuc
          console.log("toi la to chuc");
          break;
        };
        case 'verifiedUser': {
          // nguoi da duoc xac nhan
          console.log("toi la verifiedUser");
          break;
        }
      }
    }
  }
  // Drop down data render
  const menu = (
    <Menu
      items={[
        {
          label: 'asdasjdnkasjnjsan',
          key: '0',
        },
        {
          label: 'Chuyen ICP',
          key: '1',
        },
        {
          label: 'Kho luu tru FT',
          key: '2',
        },
      ]}
    />
  );
  const [size, setSize] = useState(12);
  return <>
    <header className='header' >
      <Row gutter={[4, 16]}>
        <Col span={6} className="grid-1">
          <div className='bl-logo'>
            <img src="https://res.cloudinary.com/dielvkumg/image/upload/v1661443624/logo_chim-01-03_obecwg.png" alt="" className="logo"  width="150px"  height="150px"/>
          </div>
        </Col>
        <Col span={12} className="grid-2">
          <nav className="menu">
            <ul>
              <li><Link to={'/'}>Trang chủ</Link></li>
              <li><Link to={'/launch'}>Hòm Quỹ</Link></li>
              <li><Link to={'/market'}>Chợ tình thương</Link></li>
            </ul>
          </nav>
        </Col>
        <Col span={6} className="grid-3">
          <div className="btn-login">
          {connected ?
               <Dropdown overlay={menu} trigger={['click']}>
               <Button className="balance">
                 <Space size={size} className='nameLogin'>
                   {balance} <img src="https://res.cloudinary.com/dielvkumg/image/upload/v1660903783/IC_1_rxetca.png" alt="" />
                 </Space>
               </Button>
         </Dropdown>: ""}
            <Button className="login" onClick={loginWithPlug}>
              <Space size={size} className='nameLogin'>
                {connected ? "Connected" : "Authenticate"} <img src="https://res.cloudinary.com/dielvkumg/image/upload/v1660903783/IC_1_rxetca.png" alt="" />
              </Space>
            </Button>
          </div>
        </Col>
      </Row>
    </header>
  </>
};

export default Header;

