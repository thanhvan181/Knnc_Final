import React, { useEffect, useState } from "react";
import { Row, Col, Button, Typography } from "antd";
import "./Detail.css";
import { Variant, VariantClass } from "@dfinity/candid/lib/cjs/idl";
import { Principal } from "@dfinity/principal";
import { IDL, VariantForm } from "@dfinity/candid";
import * as S from "./styles"
import { useParams } from "react-router-dom";
import { TokenInfoExt } from "../../../../../declarations/knnc_backend/knnc_backend.did";
import { knnc_backend } from "../../../../../declarations/knnc_backend";

type Props = {};

const DetailMarket = (props: Props) => {
  const params = useParams()
  const id = BigInt(params.id);
  const [data, setData] = useState<TokenInfoExt>()
  const [connected, setConnected] = useState<boolean>()
  useEffect(() => {
    (async () => {
      let nftDetail = await knnc_backend.getTokenInfoById(id);
      console.log('nft', nftDetail);
      setData(nftDetail[0])

      setConnected(await window.ic.plug.isConnected())
    })();
  }, []);

  const buyNFT = async () => {
    if (!await window.ic.plug.isConnected()) {
      alert("Ban chua dang nhap!")
      return
    }

    try {
      let result = await knnc_backend.buyNFT(await Principal.from(await window.ic.plug.sessionManager.sessionData.principalId), Principal.from(data.owner), data.index);
      console.log(result);
    } catch (e) {
      alert(e)
    }
  
  }

  return (
    <S.WrapperDetails>
      <Row justify="center" align="middle">
        <Col span={12}>
          <img
            src={data === undefined ? "#" : data.tokenMetadata.tokenUri}
            alt=""
            width="585px"
            height="600px"
          />
        </Col>
        <Col span={12}>
          <Typography.Title level={3} style={{ marginTop: 20, color: '#f9a825', marginBottom: 30 }}>
            {data === undefined ? "No collection" : data.collection}
          </Typography.Title>
          <S.Customspan>{data?.tokenMetadata.tokenName}</S.Customspan>

          <S.CustomP className="desc">
            {data === undefined ? "" : Principal.from(data.owner).toString()}
          </S.CustomP>

          <Button type="primary" disabled={false} onClick={buyNFT}>Mua NFT</Button>

        </Col>

      </Row>
      <S.Btn>
        <Button>Go Back</Button>
      </S.Btn>
    </S.WrapperDetails>

  );
};

export default DetailMarket;
