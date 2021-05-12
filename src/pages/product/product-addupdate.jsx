import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Upload, Button } from 'antd'

import {
    ArrowLeftOutlined
} from '@ant-design/icons'

import LinkButton from '../../components/link-button'

const { Item } = Form
const { TextArea } = Input

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
}

export default class ProductAddUpdate extends Component {
    render() {
        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined style={{ color: 'green', marginRight: 15, fontSize: 20 }} onClick={() => this.props.history.goBack()} />
                </LinkButton>
                <span>添加商品</span>
            </span>
        )

        return (
            <Card title={title}>
                <Form {...layout}>
                    <Item name="name" label="商品名称" rules={[{ required: true }]}>
                        <Input placeholder="请输入商品名称" />
                    </Item>

                    <Item name="desc" label="商品描述" rules={[{ required: true }]}>
                        <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maRows: 6 }} />
                    </Item>

                    <Item name="price" label="商品价格" rules={[{ required: true }]}>
                        <Input type="number" placeholder="请输入商品价格" addonAfter='元' />
                    </Item>

                    <Item name="category" label="商品分类" rules={[{ required: true }]}>
                        <div>商品分类</div>
                    </Item>

                    <Item name="category" label="商品分类" rules={[{ required: true }]}>
                        <div>商品分类</div>
                    </Item>

                    <Item name="category" label="商品分类" rules={[{ required: true }]}>
                        <div>商品分类</div>
                    </Item>


                </Form>
            </Card>
        )
    }
}
