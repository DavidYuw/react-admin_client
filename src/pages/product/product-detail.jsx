import React, { Component } from 'react'

import {
    Card,
    List
} from 'antd'

import {
    ArrowLeftOutlined
} from '@ant-design/icons'

import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constants'

const Item = List.Item

export default class ProductDetail extends Component {
    render() {
        console.log( this.props.location.state.product)
        const { name, desc, price, imgs, detail } = this.props.location.state.product
       

        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined style={{ color: 'green', marginRight: 15, fontSize: 20 }} onClick={() => this.props.history.goBack()} />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )

        return (
            <Card title={title} className="product-detail">
                <List>
                    <Item className="product-detail-list-item">
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item className="product-detail-list-item">
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item className="product-detail-list-item">
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item className="product-detail-list-item">
                        <span className="left">所属分类:</span>
                        <span>电脑 -- 笔记本</span>
                    </Item>
                    <Item className="product-detail-list-item">
                        <span className="left">商品图片:</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img key={img} src={BASE_IMG_URL + img} alt="img" className="product-img" />
                                ))
                            }
                        </span>
                    </Item>
                    <Item className="product-detail-list-item">
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
