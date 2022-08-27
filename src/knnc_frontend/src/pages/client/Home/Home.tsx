import { Principal } from "@dfinity/principal";
import { Card, Carousel, List } from "antd";
import { Typography } from 'antd';
import React, { useEffect, useMemo } from "react";
import { knnc_backend } from "../../../../../declarations/knnc_backend";
import FeaturedItem from "../../../../components/Featured/FeaturedItem";
import NewsItem from "../../../../components/News/NewsItem";
import NewsList from "../../../../components/News/NewsList";
import TopSponsor from "../../../../components/TopSponsor/TopSponsor";
const { Title } = Typography;

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};
//fake data - xiu goi api thi xoa di
const data = [
  {
    imageUrl: 'https://picsum.photos/300/200',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
  },
  {
    imageUrl: 'https://picsum.photos/300/200',
  }
];
//Component render FeatureList
const FeatureList = () => {
  useEffect(() => {
    //call api o day

  }, [])

  return (
    <>
      <Title level={3} style={{ fontSize: '40px', marginTop: 20 }}>Feature</Title>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => {
          return (
            <List.Item>
              <FeaturedItem isOnlyImage={true} item={item} />
            </List.Item>
          )
        }}
      />
    </>

  )
}


type Props = {};

const HomePage = (props: Props) => {
  // call api o day
  useEffect(() => {
    (async () => {
    })()
  }, [])
  return (
    <>
      <FeatureList />
      <TopSponsor />
      <NewsList />
    </>
  )




  // return (
  //   <>
  //     <div className="container">
  //       <FeatureList />
  //       <NewsList />
  //     </div>
  //   </>
  // );
};

export default HomePage;
