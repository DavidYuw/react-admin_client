import React, { Component } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'

import {
    PlusOutlined
} from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'

const Option = Select.Option

export default class ProductHome extends Component {

    state = {
        total: 0,
        products: [],
        loading: false,
        searchName: "",
        searchType: "productName",
        curPage: 1
    }

    updataStatus = async (productId, status) => {
        const result = await reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('更新商品状态成功')
            this.getProducts(this.pageNum)
        } 
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
                render: (product) => {
                    const { status, _id } = product
                    return (
                        <span>
                            <Button type='primary' onClick={() => this.updataStatus(_id, status === 1 ? 2 : 1)}>
                                {status === 1 ? '下架' : '上架'}
                            </Button>
                            <span>{status === 1 ? '在售' : '已下架'}</span>
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
                            <LinkButton onClick={() => this.props.history.push('/product/detail', { product })}>详情</LinkButton>
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

    getProducts = async (pageNum) => {

        this.pageNum = pageNum

        this.setState({ loading: true })

        const { searchName, searchType } = this.state
        let result

        if (searchName) {
            result = await reqSearchProducts(pageNum, PAGE_SIZE, searchName, searchType)
        } else {
            result = await reqProducts(pageNum, PAGE_SIZE)
        }

        this.setState({ loading: false })

        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                total,
                products: list
            })
        }
    }

    onClickSearch = () => {
        this.setState({
            curPage: 1,
        });
        this.getProducts(1)
    }

    componentDidMount() {
        this.getProducts(1)
    }

    onChange = page => {
        this.setState({
            curPage: page,
        });
        this.getProducts(page)
    };

    render() {

        const { products, total, loading, searchName, searchType, curPage } = this.state

        const title = (
            <span>
                <Select value={searchType} style={{ width: 150 }} onChange={value => this.setState({ searchType: value })}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input
                    placeholder='关键字'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={e => this.setState({ searchName: e.target.value })}
                />
                <Button type='primary' onClick={this.onClickSearch}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type='primary'>
                <PlusOutlined />添加商品
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey="_id"
                    loading={loading}
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        total,
                        // current: this.state.curPage,
                        current: curPage,
                        // onChange: (pageNum) => { this.getProducts(pageNum) }
                        onChange: this.onChange
                    }}
                />
            </Card>
        )
    }
}
