import { Tag, Typography } from 'antd';
const { Text, Link } = Typography;
import React from 'react'

type Props = {
  isOnlyImage?: boolean;
  item?: any;
}
const renderFeatureItemImage = (item) => {
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden' }}>
      <img src={item.imageUrl} alt="" />
    </div>
  )
}
const renderFeaturedItemFull = (item) => {
  return (
    <div style={{ borderRadius: 10, overflow: 'hidden' }}>
      <img src={item.imageUrl} alt="" />
      <div style={{ marginTop: 20 }}>
        <Tag color="#87d068" style={{ padding: 4, borderRadius: 8, marginRight: 16 }}>Fantasty</Tag>
        <Tag color="#87d068" style={{ padding: 4, borderRadius: 8 }}>Adventure</Tag>
      </div>
      <Typography.Title level={3} style={{ marginTop: 20, color: 'red' }}>
        Bonsai Warrior NFT
      </Typography.Title>
      <Text type="secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio omnis nostrum ad tenetur commodi</Text>
      <div style={{ display: 'flex', gap: 20, justifyContent: 'start', marginTop: 20 }}>
        <img src="https://picsum.photos/200" width={20} alt="" style={{ borderRadius: '50%', objectFit: 'cover' }} />
        <Text italic strong>Ant Design (italic)</Text>
      </div>
    </div>
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