import { Col, Image, Row } from 'antd'
import Countdown from 'antd/lib/statistic/Countdown'
import React from 'react'
import * as S from "./styles"

interface Props {
    
}

const Fund = (props: Props) => {

    const deadline = Date.parse('2022-12-31');
  
   
    return (
        <>
            <Row gutter={10}>
                <Col span={8}>
                    <Image
                        width={250}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                        preview={{
                            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        }}
                    />
                    <S.WrapperCenter>
                        <S.BoxWrapper> 3000/40000</S.BoxWrapper>

                        <Countdown title="Countdown" value={deadline} format="DD:HH:mm:ss" />
                   </S.WrapperCenter>

                    
                </Col>
                <Col span={8}>
                    <Image
                        width={250}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                        preview={{
                            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        }}
                    />
                    <S.WrapperCenter>
                        <S.BoxWrapper> 3000/40000</S.BoxWrapper>

                        <Countdown title="Countdown" value={deadline} format="DD:HH:mm:ss" />
                    </S.WrapperCenter>

                </Col>
                <Col span={8}>
                    <Image
                        width={250}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                        preview={{
                            src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                        }}
                    />
                    
                    <S.WrapperCenter>
                        <S.BoxWrapper> 3000/40000</S.BoxWrapper>

                        <Countdown title="Countdown" value={deadline} format="DD:HH:mm:ss" />
                    </S.WrapperCenter>


                </Col>

            </Row>

           
            

            
        </>
    )
}

export default Fund
