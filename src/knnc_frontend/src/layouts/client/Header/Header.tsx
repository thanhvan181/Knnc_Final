import { Col, Row, Button, Space, PageHeader } from 'antd';
import { blue } from '@ant-design/colors';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import "./Header.css"
import { Link } from "react-router-dom";
import {knnc_backend} from "../../../../../declarations/knnc_backend"
import { Principal } from '@dfinity/principal';

type Props = {};
declare global {
  interface Window {
    ic : {
      plug : {
        requestConnect() : Promise<any>,
        isConnected() : Promise<boolean>,
        sessionManager : {
          sessionData : {
            principalId : Principal,
            accountId : string
          }
        },
        requestBalance() : Promise<[any]> 
      }
    }
  }
}

const Header = (props: Props) => {
  const [principal, setPrincipal] = useState<Principal>()
  const [connected, setconnected] = useState(false)
  const loginWithPlug = async () => {
    let result = await window.ic.plug.requestConnect()
    let isConnected = await window.ic.plug.isConnected()
    if(isConnected) {
      setconnected(true)
      setPrincipal(window.ic.plug.sessionManager.sessionData.principalId)
      let balance = await window.ic.plug.requestBalance()
      // lay so ICP trong vi
      // console.log(balance[0].amount);

      
      let createUser = await knnc_backend.createUser(await Principal.from(window.ic.plug.sessionManager.sessionData.principalId))
      console.log(createUser);
      let userInfo = await knnc_backend.getUserInfoByPrincipal(Principal.from(await window.ic.plug.sessionManager.sessionData.principalId))
      console.log(userInfo);
      
      // switch case o day
      console.log(Object.getOwnPropertyNames(userInfo[0].role)[0].toString() == 'organization');



    }
  }

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
              <li><Link to={'/'}>Hòm Quỹ</Link></li>
              <li><Link to={'/'}>Chợ tình thương</Link></li>
            </ul> 
          </nav>
        </Col>
        <Col span={8} className="grid-3">
          <div className="btn-login">
            <Button className="login" onClick={loginWithPlug}>
              <Space size={size} className='nameLogin'>
                {connected ? "Profile" : "Authenticate"} <img src="https://res.cloudinary.com/dielvkumg/image/upload/v1660903783/IC_1_rxetca.png" alt="" />
              </Space>
            </Button>
          </div>
        </Col>
      </Row>
    </header>
  </>
};

export default Header;
