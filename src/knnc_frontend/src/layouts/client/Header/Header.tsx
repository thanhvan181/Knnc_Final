
import { Col, Row, Button, Space, PageHeader, Menu, Dropdown, Layout } from 'antd';
import { blue } from '@ant-design/colors';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import "./styles.ts"
import { Link } from "react-router-dom";
import { knnc_backend } from "../../../../../declarations/knnc_backend"
import { Principal } from '@dfinity/principal';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import * as S from "./styles"

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
const { Header, Content, Footer } = Layout;

const HeaderLayout = (props: Props) => {
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

  return <>

    <Layout className="layout">
      <Header>
        <div className="logo" />


        <Menu mode="horizontal" defaultSelectedKeys={['mail']} theme="dark" >
          <Menu.Item key="1"  >
            Trang chủ
          </Menu.Item>
          <Menu.Item key="2"  >
            Hòm Quỹ
          </Menu.Item>
          <Menu.Item key="3"  >
            Chợ tình thương
          </Menu.Item>

          <S.WrapperAuthen>
            {connected ? <Menu.SubMenu key="SubMenu" title="Navigation Two - Submenu"  >
              <Menu.Item key="two" >
                Navigation Two
              </Menu.Item>
              <Menu.Item key="three" >
                Navigation Three
              </Menu.Item>
              <Menu.ItemGroup title="Item Group">
                <Menu.Item key="four" >
                  Navigation Four
                </Menu.Item>
                <Menu.Item key="five" >
                  Navigation Five
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.SubMenu> : ""}

            <Menu.Item key="3"  >
              <Button onClick={loginWithPlug}>Authenticate</Button>
            </Menu.Item>
          </S.WrapperAuthen>

        </Menu>
      </Header>
    </Layout>

  </>
};

export default HeaderLayout;

