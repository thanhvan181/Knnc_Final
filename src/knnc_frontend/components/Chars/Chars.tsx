import { Col, Row } from 'antd'
import React from 'react'
import Fund from './components/Fund/Fund'
import PieCharts from './components/PieChart/PieChart'
import TableList from './components/Table/Table'


interface Props {
    
}

const Chars = (props: Props) => {
    return (
        <>
            <Row gutter={12}>
                <Col flex="400px">
                    <PieCharts/>


                </Col>
                <Col flex="auto">

                    <Fund/>
                </Col>
                
            </Row>
            <TableList />

           
        </>
       
    )
}

export default Chars
