import React from "react";
import { Col, Row } from 'antd';
import "./Footer.css"

type Props = {};

const Footer = (props: Props) => {
  return <>
    <footer>
      <Row>
        <Col span={12}>
          <span className="license">Developed by Team Bees Thon</span>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={8}><img src="https://res.cloudinary.com/dielvkumg/image/upload/v1661154461/2020-FPT_Edu-White_1_r0vdc8.png" alt="" /></Col>
            <Col  span={8}><img src="https://res.cloudinary.com/dielvkumg/image/upload/v1661155306/image_4_2_mm3dzn.png" alt="" /></Col>
            <Col span={8}><img src="https://res.cloudinary.com/dielvkumg/image/upload/v1661154463/2020-FPTPolytechic-White_1_fjavpr.png" alt="" /></Col>
          </Row>
        </Col>
      </Row>
    </footer>
  </>;
};

export default Footer;
