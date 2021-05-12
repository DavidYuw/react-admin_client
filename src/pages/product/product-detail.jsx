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

import { reqCategoryById } from '../../api/index'

const Item = List.Item

export default class ProductDetail extends Component {


    state = {
        cName1: '',
        cName2: ''
    }

    async componentDidMount() {
        const { pCategoryId, categoryId } = this.props.location.state.product
        
        if (pCategoryId === '0') {
            const result = await reqCategoryById(categoryId)           
            const cName1 = result.data.name
            this.setState({ cName1 })
        } else {    
            const results = await Promise.all([reqCategoryById(pCategoryId),reqCategoryById(categoryId)])
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({
                cName1,
                cName2
            })

        }
    }

    render() {
        // console.log(this.props.location.state.product)
        const { name, desc, price, imgs, detail } = this.props.location.state.product
        const { cName1, cName2 } = this.state

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
                        <span>{cName1}  {cName2 ? '--' + cName2 : ''}</span>
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
