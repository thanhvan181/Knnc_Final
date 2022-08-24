import React from 'react'
import { Row, Col, Button } from 'antd'
import './Detail.css'

type Props = {}

const DetailM = (props: Props) => {
  return (
    <>
      <div className="bl-detail">
        <div className="block-img">
          <img src="https://res.cloudinary.com/dielvkumg/image/upload/v1661332360/Img_Detail_Product_ieywpp.png" alt="" width="585px" height="600px" />
        </div>
        <div className="bl-in4">
          <div>
            <h1>Gia đình</h1>
            <div className='cate'>
              <span>Tranh vẽ</span>
              <span>User13</span>
            </div>
            <div className="bl-desc">
              <span className="desc">Although a popular socialite, She is not afraid of a battle, striking her foes with elegance.</span>
            </div>
            <div className="price"><p>100.2951 ICP</p></div>
            <div className="bl-btn"><Button className="btn">Mua NFT </Button></div>
          </div>
        </div>
      </div>
      <button className="back"><Button className="btn-back">Trở về chợ</Button></button>
    </>

  )
}

export default DetailM