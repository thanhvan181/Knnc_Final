import { Col, Row } from 'antd'
import React from 'react'
import PieCharts from './components/PieChart/PieChart'

interface Props {
    
}

const Chars = (props: Props) => {
    return (
        <>
            <Row gutter={12}>
                <Col flex="400px">
                    <PieCharts/>


                </Col>
                <Col flex="auto">Fill Rest</Col>
            </Row>
        </>
       
    )
}

export default Chars
