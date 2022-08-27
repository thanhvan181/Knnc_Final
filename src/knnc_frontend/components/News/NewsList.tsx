import React from 'react'
import { Typography, List, Row, Button, Col } from 'antd'
const { Title } = Typography;
import * as S from './styles';
import NewsItem from './NewsItem';


type Props = {}

//data fake - se xoa di sau khi call api
const data = [
    {
        imageUrl: 'https://picsum.photos/300/200',
        tag: 'pendragon quest',
        likeAmount: 34,
        title: 'Chapter 1',
        quote: 'So again, once it ...',
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nesciunt sunt rerum officia accusantium sapiente quidem nemo'
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        tag: 'pendragon quest',
        likeAmount: 34,
        title: 'Chapter 1',
        quote: 'So again, once it ...',
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nesciunt sunt rerum officia accusantium sapiente quidem nemo'
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        tag: 'pendragon quest',
        likeAmount: 34,
        title: 'Chapter 1',
        quote: 'So again, once it ...',
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nesciunt sunt rerum officia accusantium sapiente quidem nemo'
    },
    {
        imageUrl: 'https://picsum.photos/300/200',
        tag: 'pendragon quest',
        likeAmount: 34,
        title: 'Chapter 1',
        quote: 'So again, once it ...',
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores nesciunt sunt rerum officia accusantium sapiente quidem nemo'
    },
];
const NewsList = (props: Props) => {
    return (
        <S.BoxWrapper>
            <S.TitleWrap level={3}>Các hoàn cảnh khó khăn</S.TitleWrap>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={item => {
                    return (
                        <List.Item>
                            <NewsItem item={item} alignText={'left'} />
                        </List.Item>
                    )
                }}
            />
            <S.ButtonViewMore>
                <S.WrapperBtn>View More</S.WrapperBtn>
            </S.ButtonViewMore>
        </S.BoxWrapper>
    )
}

export default NewsList