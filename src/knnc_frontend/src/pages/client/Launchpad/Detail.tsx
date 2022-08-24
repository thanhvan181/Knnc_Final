import React from 'react'
import { Row, Col, Progress, Button } from "antd"
import './Detail.css';

type Props = {}

const detailLaunch = (props: Props) => {
    return (
        <>
            <div >
                <Row className="detail">
                    <Col span={12} className="img-detail"><img src="https://res.cloudinary.com/dielvkumg/image/upload/v1661163385/image_10_jnsijh.png" alt="" height="100%" width="580px"/></Col>
                    <Col span={12} className="inf-get">
                        <Progress percent={20} showInfo={false} className="progress" />
                        <div className='blockICP'>
                            <div className='ICP'>
                                <div className='ICP-img'><img src="https://res.cloudinary.com/dielvkumg/image/upload/v1660903783/IC_1_rxetca.png" /></div>
                                <div><h3 className='ICP-number'>294 ICP</h3></div>
                            </div>
                            <span className="gh">Giới hạn nhận ICP của chiến dịch là : 4000 ICP</span>
                        </div>
                        <div className='date'>
                            <h3 className='dhms'>21d 23h 40m 44s</h3>
                            <span className="gh">Kết thúc</span>
                        </div>
                        <div className='blockICP'>
                            <div className='ICP2'>
                                <div className='ICP-img2'><img src="https://res.cloudinary.com/dielvkumg/image/upload/v1660903783/IC_1_rxetca.png" /></div>
                                <div><h3 className='ICP-number2'>2 ICP</h3></div>
                            </div>
                            <span className="gh2">Mối 2 ICP sẽ nhận được 1 NFT ngẫu nhiên</span>
                        </div>
                        <Button className='btn-sponsor'>Tài trợ cho dự án này</Button>
                        <br />
                        <Button className='btn-share'>Chia sẻ dự án</Button>
                    </Col>
                    <div className='block-story'>
                        <h2>Câu chuyện:</h2>
                        <span className='story'>The Mille Marketplace will set HIGH standard among NFTs marketplace.
                            Real art from real artists only will be admitted into the Marketplace. Every project will be carefully investigated and the artists will benefit from exposure thanks to the curated launches. This includes dedicated interviews, AMA hosted on the Mille Discord/TG and constant updates about the collections on Mille social medias.
                            Our mission is to have the highest ratio of "sold out" on the entire IC. Having successful launches will be our number 1 priority.
                            The Marketplace will also feature a voting system where Skulls owners/those who have interacted enough with the platform (X traded ICP) will be able to rate the listed projects.
                            The whole Mille Marketplace could be described as a safe heaven fo r artists and art enjoyers.
                        </span>
                    </div>
                    <div className='block-story'>
                        <h2>Hoạt động:</h2>

                        <span className='story'>
                            <p>- WL for buying a real BTC Skull</p>
                            <p>- Free Airdrops/WL for projects on the Mille Marketplace (when possible) </p>
                            <p>- Reduced fees when buying from the Mille Marketplace</p>
                            <p>- Skulls council membership - a dedicated channel where verified BTCS owners will be able to interact and make suggestions/vouche for projects</p>
                            <p>- Voting system access available from the launch date</p>
                            <p>Collection of 2024 NFTs; 2000 NFTs for sale on CrowdfundNFT; 24 kept for promotional and partnership purposes.</p>
                        </span>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default detailLaunch