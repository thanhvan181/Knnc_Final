
import { Col, Row, Button, Space, PageHeader, Menu, Dropdown, Layout } from 'antd';
import { blue } from '@ant-design/colors';
import 'antd/dist/antd.css';
import React, { useEffect, useState } from 'react';
import "./styles.ts"
import { Link } from "react-router-dom";
import { knnc_backend } from "../../../../../declarations/knnc_backend"
import { Principal } from '@dfinity/principal';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
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
  const [beeBalance, setBeeBalance] = useState<BigInt>(BigInt(0))
  const [ddUser, setDdUser] = useState([
    {
      label: <div>{principal && principal.toString()}</div>,
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/product/add'}>Tao san pham</Link>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <span>Hoan canh yeu thich</span>,
      key: '3',
    },
    {
      label: <Link to={'/my-nft'}>NFT cua toi</Link>,
      key: '4',
    }
  ]);
  
  const loginWithPlug = async () => {
    let result = await window.ic.plug.requestConnect()
    let isConnected = await window.ic.plug.isConnected()
    if (isConnected) {
      setconnected(true)
      setPrincipal(window.ic.plug.sessionManager.sessionData.principalId)
      let balance = await window.ic.plug.requestBalance()
      // lay so ICP trong vi
      console.log(balance[0].amount);
      setBalance(balance[0].amount)
      setBeeBalance(await knnc_backend.getFTTokenOfUser(Principal.from(window.ic.plug.sessionManager.sessionData.principalId)))


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
          setDdUser(prev=> [...prev, {
            label: <Link to={'/admin'}>Admin</Link>,
            key: '5',
          },])
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
          setDdUser(prev=> [...prev, {
            label: <Link to={'/create-fund'}>Tao Quy</Link>,
            key: '5',
          },])
          break;
        };
        case 'verifiedUser': {
          // nguoi da duoc xac nhan
          console.log("toi la verifiedUser");
          setDdUser(prev=> [...prev, {
            label: <Link to={'/product/add'}>Dang ban</Link>,
            key: '5',
          },])
          break;
        }
      }
    }
  }
  // Drop down left data render
  const dropDownLeft = (
    <Menu
      items={[
        {
          label: <div>Dia chi vi</div>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ]}
    />
  );
  // Drop down right data render
<<<<<<< HEAD
  // const dropDownRight = (
    
  // );
=======
  const dropDownRight = (
    <Menu
      items={[
        {
          label: <div>Dia chi vi</div>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: <Link to={'/product/add'}>Tao san pham</Link>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: <Link to={'/user-info'}>Cap nhat thong tin </Link>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: <span>Hoan canh yeu thich</span>,
          key: '3',
        },
        {
          type: 'divider',
        },
      ]}
    />
  );
>>>>>>> 6a5606f954b50610b95741be8ef1438f4806e3ee
  return <>


    <Layout className="layout">
      <Header>
        <div className="logo" />


        <Menu mode="horizontal" defaultSelectedKeys={['mail']} theme="dark" >
          <Menu.Item key="1"  >
            <Link to={'/'}>Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="2"  >
            <Link to={'/launchpad'}>Hòm Quỹ</Link>
          </Menu.Item>
          <Menu.Item key="3"  >
            <Link to={'/market'}>Chợ tình thương</Link>
          </Menu.Item>

          <S.WrapperAuthen>
            {connected ? (
              <Dropdown overlay={dropDownLeft} trigger={['click']}>
                <Button onClick={e => e.preventDefault()}>
                  ICP: {balance}
                </Button>
              </Dropdown>) : ""}

            {connected ? (
              <div style={{ marginLeft: 8 }}>
                <Dropdown overlay={<Menu
                //@ts-ignore
                  items={ddUser}
                />} trigger={['click']} placement="bottomRight">
                  <Button onClick={e => e.preventDefault()} icon={<UserOutlined />}>
                    Profile
                  </Button>
                  
                </Dropdown>
                <Button>{beeBalance.toString()}</Button>
               
              </div>
            ) :
              <Menu.Item key="3"  >
                <Button onClick={loginWithPlug}>Authenticate</Button>
              </Menu.Item>
              
              }

              

          </S.WrapperAuthen>

        </Menu>
      </Header>
    </Layout>

  </>
};

export default HeaderLayout;

