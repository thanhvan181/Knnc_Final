import { Tag, Typography, Image } from 'antd';
const { Text, Link } = Typography;
import React from 'react'
import * as S from './styles'
type Props = {
  isOnlyImage?: boolean;
  item?: any;
}
const renderFeatureItemImage = (item) => {
  return (
    <S.BoxWrapper>
      <Image
        width={300}
        src={item.imageUrl}
      />
    </S.BoxWrapper>
  )
}
const renderFeaturedItemFull = (item) => {
  return (
    <S.BoxWrapper>
      <img src={item.imageUrl} alt="" />
      <div style={{ marginTop: 20 }}>
        <Tag color="#fbc02d" style={{ padding: 4, borderRadius: 8, marginRight: 16 }}>Fantasty</Tag>
        <Tag color="#0277bd" style={{ padding: 4, borderRadius: 8 }}>Adventure</Tag>
      </div>
      <Typography.Title level={3} style={{ marginTop: 20, color: '#f9a825' }}>
        Bonsai Warrior NFT
      </Typography.Title>
      <Text type="secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio omnis nostrum ad tenetur commodi</Text>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'start', marginTop: 20 }}>
        <img src="https://picsum.photos/200" width={20} alt="" style={{ borderRadius: '50%', objectFit: 'cover' }} />
        <Text italic strong>Ant Design (italic)</Text>
      </div>
    </S.BoxWrapper>
  )
}

const FeaturedItem = (props: Props) => {
  const { isOnlyImage, item } = props;
  return (
    <>
      {isOnlyImage ? (
        renderFeatureItemImage(item)
      ) : (
        renderFeaturedItemFull(item)
      )}
    </>
  )
}

export default FeaturedItem