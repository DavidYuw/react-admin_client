import React, { Component } from 'react'
import { Card, Select, Input, Button, Table } from 'antd'

import {
    PlusOutlined
} from '@ant-design/icons'

import LinkButton from '../../components/link-button'

const Option = Select.Option

export default class ProductHome extends Component {

    state = {
        products: [
            {
                "status": 1,
                "imgs": [],
                "_id": "6095447f28fc842b56abf6b6",
                "name": "联想ThinkPad X1",
                "desc": "联想超级笔记本",
                "price": 6000,
                "detail": "<p>联想超级笔记本</p>\n",
                "pCategoryId": "0",
                "categoryId": "608d3e3eebe5b998882ce135",
                "__v": 0
            },
            {
                "status": 1,
                "imgs": [],
                "_id": "609544e128fc842b56abf6b7",
                "name": "Apple MacBook Air",
                "desc": "苹果超薄笔记本",
                "price": 7000,
                "detail": "<p>苹果超薄笔记本</p>\n",
                "pCategoryId": "0",
                "categoryId": "608d3e3eebe5b998882ce135",
                "__v": 0
            }
        ]
    }

    initColums = () => {
        this.columns = [
            {
                width: 200,
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                width: 150,
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                width: 100,
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                render: (product) => {
                    return (
                        <span>
                            <LinkButton>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            },
        ]
    }

    UNSAFE_componentWillMount() {
        this.initColums()
    }

    render() {

        const { products } = this.state

        const title = (
            <span>
                <Select value='1' style={{ width: 150 }}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{ width: 150, margin: '0 15px' }} />
                <Button type='primary'>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary'>
                <PlusOutlined />添加商品
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table rowkey='_id' dataSource={products} columns={this.columns} bordered />
            </Card>
        )
    }
}
