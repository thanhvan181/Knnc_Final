import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { knnc_backend } from '../../../../declarations/knnc_backend/index';
import { UserExt } from '../../../../declarations/knnc_backend/knnc_backend.did';
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

const TopRank = () => {

    // const appendData = () => {
    //     fetch(fakeDataUrl)
    //         .then((res) => res.json())
    //         .then((body) => {
    //             setData(data.concat(body.results));
    //             message.success(`${body.results.length} more items loaded!`);
    //         });
    // };
    const [users, setUsers] = useState<any[]>([])
    useEffect(() => {
        (async () => {
            let api = await knnc_backend.getUsersHaveFTTokens()
            for(let element of api) {
                let user = await knnc_backend.getUserInfoByPrincipal(element)
                let temp = {
                    gender : '',
                    name : user[0].name,
                    picture : {
                        large : user[0].image,
                        medium : user[0].image,
                        thumbnail : user[0].image,
                    }
                }
                console.log(temp);
                
                setUsers(prevData=> [...prevData, temp])
            }
            
        })()
    }, []);

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            // appendData();
        }
    };

    return (
        <List style={{ background: '#f5f5f5', borderRadius: 8, padding: 10 }}>
            <VirtualList
                data={users}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                onScroll={onScroll}
            >
                {(item) => (
                    <List.Item key={item.email}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description={item.email}
                        />
                        <div>Content</div>
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};

export default TopRank;