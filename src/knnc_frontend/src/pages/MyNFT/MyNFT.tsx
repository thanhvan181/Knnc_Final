import { Principal } from '@dfinity/principal';
import { Card, Image, List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { knnc_backend } from '../../../../declarations/knnc_backend';
const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];
const MyNftItem = () => {
    console.log(data);
    
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Image width={200} height={200} src={'https://vcdn-dulich.vnecdn.net/2020/09/04/1-Meo-chup-anh-dep-khi-di-bien-9310-1599219010.jpg'} />
            <Typography.Title level={3} style={{ margin: 0, textTransform: 'uppercase' }}>jkasbdksabd</Typography.Title>
            <Typography.Text strong style={{ color: '#fbc02d' }}>User 12</Typography.Text>
        </div>
    )

}

const MyNFT = () => {
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     (async () => {
    //         let nfts = await knnc_backend.getTokensOfUser(Principal.from(await window.ic.plug.sessionManager.sessionData.principalId))
    //         for (let i  of nfts) {
    //             for(let e of await knnc_backend.getTokenInfoById(0)) {
    //                 let temp = {
    //                     imageUrl: e.tokenMetadata.tokenUri,
    //                     user: Principal.from(e.owner).toString(),
    //                     name: e.tokenMetadata.tokenName,
    //                     price: e.price,
    //                     id: e.index
    //                 }
    //                 console.log(temp);
                    
    //                 setData(prevData => [...prevData, temp])
    //             }
                
    //         }
    //     })()
    // }, [])

    return (
        <List
            grid={{
                gutter: 16,
                column: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <MyNftItem />
                </List.Item>
            )}
        />
    )
};

export default MyNFT;