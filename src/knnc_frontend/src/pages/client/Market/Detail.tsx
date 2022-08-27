import React, { useEffect } from "react";
import { Row, Col, Button, Typography } from "antd";
import "./Detail.css";
import { knnc_backend } from "../../../../../declarations/knnc_backend";
import { Variant, VariantClass } from "@dfinity/candid/lib/cjs/idl";
import { Principal } from "@dfinity/principal";
import { IDL, VariantForm } from "@dfinity/candid";
import * as S from "./styles"

type Props = {};

const DetailM = (props: Props) => {
  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <S.WrapperDetails>
      <Row justify="center" align="middle">
        <Col span={12}>
          <img
            src="https://res.cloudinary.com/dielvkumg/image/upload/v1661332360/Img_Detail_Product_ieywpp.png"
            alt=""
            width="585px"
            height="600px"
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={3} style={{ marginTop: 20, color: '#f9a825', marginBottom: 30 }}>
            Gia Dinh
          </Typography.Title>
          <S.Customspan>Tranh vẽ</S.Customspan>
          <S.Customspan>User13</S.Customspan>

          <S.CustomP className="desc">
            Although a popular socialite, She is not afraid of a battle,
            striking her foes with elegance.
          </S.CustomP>
         
            <Button type="primary">Mua NFT </Button>
         
        </Col>
      
      </Row>
      <S.Btn>
        <Button>Go Back</Button>
      </S.Btn>
    </S.WrapperDetails>
   
  );
};

export default DetailM;
