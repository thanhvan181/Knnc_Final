import React from "react";
import { Col, Row } from 'antd';
import {Layout } from 'antd';

type Props = {};
const {  Footer } = Layout;

const Footers = (props: Props) => {
  return <>
    <Footer style={{ textAlign: 'center' }} >Ant Design ©2022  Created by Hackathon 2020 </Footer>
    
  </>;
};

export default Footers;
