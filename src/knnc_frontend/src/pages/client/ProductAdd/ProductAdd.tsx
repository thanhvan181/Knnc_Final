import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import * as S from "./styles";
import { Col, Divider, Row, Typography, Form, Input, Button } from "antd";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { useState } from "react";

const { Title } = Typography;
type Props = {};
const { Dragger } = Upload;

const ProductAdd = (props: Props) => {

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [dataForm, setDataForm] = useState({
        file: '',
        price: ''
    });
    console.log("dataForm", dataForm)

    const handleBeforeUpload = (file: any) => {
        // setDataForm(prev => ({ ...prev, file }));
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

        // setDataForm((prev)=> ({...prev, file: dataInput.}))

        // console.log(dataInput);

    }

    return (
        <S.WrapperProductAdd>
            <Title level={3}>Đăng bán</Title>
            <Divider />
            <Form form={form} onFinish={onFinish}>
                <Form.Item name="file">
                    <Dragger {...propsUpload} fileList={fileList}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                    </Dragger>
                </Form.Item>
                <Form.Item name="price">
                    <Input type="number" placeholder="nhap prrice " required />
                </Form.Item>
                <Button htmlType="submit">Add</Button>
            </Form>
        </S.WrapperProductAdd>
    );
};

export default ProductAdd;
