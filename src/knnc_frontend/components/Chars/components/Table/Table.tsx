import { Principal } from '@dfinity/principal';
import { Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { knnc_backend } from '../../../../../declarations/knnc_backend';
const { Option } = Select

type Props = {}

const TableList = (props: Props) => {

    const handleChange = async (value, record) => {
        console.log("record", record)
        console.log("value", value);
        // switch(value) {
        //     case 'organiza'
        // }
        
        
        let result = await knnc_backend.setUserRole(
            //@ts-ignore
            Principal.from(await window.ic.plug.principalId),
            //@ts-ignore
            Principal.from(record.principal),
            //@ts-ignore
            {[value] : null}
        )
        console.log(result);
        
    }

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
                {
                    text: 'Joe',
                    value: 'Joe',
                },
                {
                    text: 'Jim',
                    value: 'Jim',
                },
                {
                    text: 'Submenu',
                    value: 'Submenu',
                    children: [
                        {
                            text: 'Green',
                            value: 'Green',
                        },
                        {
                            text: 'Black',
                            value: 'Black',
                        },
                    ],
                },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value: string, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
        },
        {
            title: 'role',
            
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.role - b.role,
            render: (record) => {
                console.log("recordxxxx", record)
                return (
                    <Select defaultValue={record.role} style={{ width: 120 }} onChange={(value)=> handleChange(value, record)}>
                        <Option value="organization">To chuc</Option>
                        <Option value="verifiedUser" >Hoàn cảnh khó khăn</Option>
                        <Option  value="normal">Mạnh thường quân</Option>
                    </Select>
                )
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            filters: [
                {
                    text: 'London',
                    value: 'London',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
            ],
            onFilter: (value: string, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'principal',
            dataIndex: 'principal',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.principal - b.principal,
        },
    ];




    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            let users = await knnc_backend.getAllUsers()
            for (let element of users) {
                let temp = {
                    key: Principal.from(element.principal).toString(),
                    principal: Principal.from(element.principal).toString(),
                    name: element.name,
                    role: Object.getOwnPropertyNames(element.role)[0],
                    address: element.address
                }
                setData(prevData => [...prevData, temp])
            };
        })()
    }, [])

    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false} />

        </>
    )
}

export default TableList