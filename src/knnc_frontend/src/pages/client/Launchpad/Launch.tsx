import React, { useEffect } from 'react'
import { List, Typography } from 'antd';
import FeaturedItem from '../../../../components/Featured/FeaturedItem';
import { knnc_backend } from '../../../../../declarations/knnc_backend';
const { Title } = Typography;

type Props = {}

const FeatureList = () => {
  
  const data = [
    {
      imageUrl: 'https://picsum.photos/300/200',
      tag: 'pendragon quest',
      likeAmount: 34,
      title: 'Chapter 1',
      quote: 'So again, once it ...',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nesciunt sunt rerum officia accusantium sapiente quidem nemo'
    },
    {
      imageUrl: 'https://picsum.photos/300/200',
      tag: 'pendragon quest',
      likeAmount: 34,
      title: 'Chapter 1',
      quote: 'So again, once it ...',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nesciunt sunt rerum officia accusantium sapiente quidem nemo'
    },
    {
      imageUrl: 'https://picsum.photos/300/200',
      tag: 'pendragon quest',
      likeAmount: 34,
      title: 'Chapter 1',
      quote: 'So again, once it ...',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nesciunt sunt rerum officia accusantium sapiente quidem nemo'
    },
    {
      imageUrl: 'https://picsum.photos/300/200',
      tag: 'pendragon quest',
      likeAmount: 34,
      title: 'Chapter 1',
      quote: 'So again, once it ...',
      desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nesciunt sunt rerum officia accusantium sapiente quidem nemo'
    },
  ];
  useEffect(() => {
    //call api o day
    (async () => {
      let data = await knnc_backend.getAllFunds()
      console.log(data);
      
    })()
  }, [])

  return (
    <>
      <List
        style={{ marginTop: 40 }}
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => {
          return (
            <List.Item>
              <FeaturedItem isOnlyImage={false} item={item} />
            </List.Item>
          )
        }}
      />
    </>

  )
}
const Launch = (props: Props) => {
  return (
    <div>
      <FeatureList />
    </div>
  )
}

export default Launch