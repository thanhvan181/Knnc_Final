import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import * as S from "./styles";
import { Col, Divider, Row, Typography, Form, Input, Button } from "antd";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useState } from "react";
import { Web3Storage } from "web3.storage";
import { knnc_backend } from "../../../../../declarations/knnc_backend";
import { Principal } from "@dfinity/principal";

const { Title } = Typography;
type Props = {};
const { Dragger } = Upload;
const APIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM1MGMyNzE3MjZiNzBERGM0OTE3MDVCZUExNTQ4MGVhNEMzQjc5NDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTg5Nzc4MDUzMjYsIm5hbWUiOiJ0ZXN0X3Rva2VuIn0.pjPPLiFMyzAOfZ-Y5TQ_I40IAjrRYAjj3Z9eY_EtG7E"

const ProductAdd = (props: Props) => {
    const web3Client = new Web3Storage({
        token: APIKey
    })

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [dataForm, setDataForm] = useState({
        file: '',
        price: '',
        name: ''
    });
    const [file, setFile] = useState<Element>()
    console.log(form);

    console.log("dataForm", dataForm)

    const handleBeforeUpload = (file: any) => {
        setDataForm(prev => ({ ...prev, file }));
        setFile(document.querySelector('input[type="file"]'))
        return false;
    };

    const propsUpload: UploadProps = {
        name: "file",
        accept: ".gif, .jpeg, .jpg, .png",
        beforeUpload: handleBeforeUpload,
    };
    const onFinish = (dataInput: any) => {

        const img = dataInput.file.file;
        const price = dataInput.price;
        const name = dataInput.name;

        const onUploadForm = async () => {
            console.log(img);

            //call api upload anh truoc roi tra ve url o day
            try {
                // const urlFile = await goi di dau thi goi tra ve cai url roi luu vao
                //goi api lan 2 luu cai object nay vao
                // {
                //     file: urlFile,
                //     price: price
                // }
            } catch (error) {

            }



        };
        onUploadForm();

        setDataForm((prev) => ({ ...prev, file: dataInput, price: price, name: name }))

        console.log(dataInput);

    }

    const [mintable, setMintable] = useState(false)
    const [imageLink, setImageLink] = useState("")
    const [tokenUri, setTokenUri] = useState("")

    const uploadToIPFS = async () => {
        console.log(file);


            // @ts-ignore
            const rootCid = await web3Client.put(file.files)
            console.log(rootCid);
            const res = await web3Client.get(rootCid)
            const files = await res.files()
            for (const file of files) {

                //@ts-ignore
                // console.log(`${file.cid} ${file.name} ${file.size}`)
                //@ts-ignore
                let url = 'https://' + rootCid + ".ipfs.w3s.link/" + encodeURIComponent(file.name)
                console.log(url);
                setImageLink(url)

                // if (window.ic.plug.sessionManager.sessionData.principalId === null) {
                //     console.log("Bạn chưa đăng nhập!");
                //     return;
                // }

                // if (Number(dataForm.price) === 10000) {
                //     console.log("Giá bằng 0!");
                //     return;
                // }

                setMintable(true);
                setTokenUri(url);
                

                
            }

            

            
    }

    const mint = async () => {
        console.log(dataForm);
        
            let mintResult = await knnc_backend.singleMint(
                Principal.from(await window.ic.plug.sessionManager.sessionData.principalId),
                {
                    'tokenUri': tokenUri,
                    'tokenName': dataForm.name,
                    'createAt': BigInt(Date.now())
                },
                "No collection",
                //@ts-ignore
                Number(dataForm.price)
            );

            console.log(mintResult);
            

        
    }




    return (

        <S.WrapperProductAdd>
            
            <Title level={3}>Đăng bán</Title>
            <Divider />
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="file" >
                    <Dragger {...propsUpload} fileList={fileList}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Dragger>
                </Form.Item>
                {/* <input type="file" id="file" className="file" /> */}

                <Form.Item name="price">
                    <Input type="number" placeholder="nhap prrice " required />
                </Form.Item>
                <Form.Item name="name">
                    <Input type="text" id="name" placeholder="nhap name " required />
                </Form.Item>
                <button onClick={uploadToIPFS}>Upload to IPFS</button>
                {mintable ?  <Button htmlType="submit" onClick={mint} >Mint</Button> : <Button htmlType="submit" onClick={mint} disabled >Mint</Button>}
                {imageLink === "" ? <img style={{width:300, height:200}}></img> : <img style={{width:300, height:200}} src={imageLink} ></img>}
            </Form>
        </S.WrapperProductAdd>
    );
};

export default ProductAdd;
