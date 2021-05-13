import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Upload, Button } from 'antd'

import {
    ArrowLeftOutlined
} from '@ant-design/icons'

import LinkButton from '../../components/link-button'

const { Item } = Form
const { TextArea } = Input

const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
}

const optionLists = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
    },
]

export default class ProductAddUpdate extends Component {

    formRef = React.createRef()

    state = {
        options: optionLists
    }

    onFinish = (values) => {
        console.log(values);
    }

    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            //   setOptions([...options]);
            this.setState({ options: [...this.state.options] })
        }, 1000);
    }



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
                <Form {...layout} ref={this.formRef} onFinish={this.onFinish}>
                    <Item name="name" label="商品名称" rules={[{
                        required: true,
                        message: '商品名称必须输入!',
                    }]}>
                        <Input placeholder="请输入商品名称" />
                    </Item>

                    <Item name="desc" label="商品描述" rules={[{
                        required: true,
                        message: '商品描述必须输入!',
                    }]}>
                        <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maRows: 6 }} />
                    </Item>

                    <Item name="price" label="商品价格" rules={[
                        {
                            required: true,
                            message: '商品价格必须输入!',
                        },
                        {
                            validator: (_, value) => {
                                if (value * 1 < 0) {
                                    return Promise.reject(new Error('价格必须大于零'))
                                } else {
                                    return Promise.resolve()
                                }

                            }

                        }
                    ]}>
                        <Input type="number" placeholder="请输入商品价格" addonAfter='元' />
                    </Item>

                    <Item name="category" label="商品分类">
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                        />
                    </Item>

                    <Item name="category" label="商品图片">
                        <div>商品图片</div>
                    </Item>

                    <Item name="category" label="商品详情">
                        <div>商品详情</div>
                    </Item>

                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>


                </Form>
            </Card>
        )
    }
}
