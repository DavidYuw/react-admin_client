import React, { Component } from 'react'
import { Card, Form, Input, Cascader, Button, message } from 'antd'

import {
    ArrowLeftOutlined
} from '@ant-design/icons'

import PictureWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'
import LinkButton from '../../components/link-button'
import { reqCategory, reqAddOrUpdateProduct } from '../../api/index'

const { Item } = Form
const { TextArea } = Input

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}

export default class ProductAddUpdate extends Component {

    constructor(props) {
        super(props)
        this.formRef = React.createRef()
        this.pw = React.createRef()
        this.editor = React.createRef()
    }

    state = {
        options: []
    }

    initOptions = async (categorys) => {
        const options = categorys.map(c => ({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }))


        //如果是一个二级分类商品的更新
        const { isUpdate, product } = this
        const { pCategoryId } = product

        if (isUpdate && pCategoryId !== '0') {
            //获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            //生成二级下来列表
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))

            const targetOption = options.find(option => option.value === pCategoryId)
            targetOption.children = childOptions

        }

        this.setState({
            options
        })
    }

    getCategorys = async (parentId) => {
        const result = await reqCategory(parentId)
        if (result.status === 0) {
            const categorys = result.data

            if (parentId === '0') {
                this.initOptions(categorys)
            } else {
                return categorys
            }

        }
    }

    componentDidMount() {
        this.getCategorys('0')
    }

    onFinish = async (values) => {



        const { name, desc, price, categoryIds } = values
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
            pCategoryId = '0'
            categoryId = categoryIds[0]
        } else {
            pCategoryId = categoryIds[0]
            categoryId = categoryIds[1]
        }

        const imgs = this.pw.current.getImgs()
        const detail = this.editor.current.getDetail()

        const product = { name, desc, price, pCategoryId, categoryId, imgs, detail }

        if (this.isUpdate) {
            product._id = this.product._id
        }

        console.log("@", product)

        const result = await reqAddOrUpdateProduct(product)

        console.log("#", result)

        if (result.status === 0) {
            message.success(`${this.isUpdate ? '更新' : '添加'}商品成功`)
            this.props.history.goBack()
        } else {
            message.error(`${this.isUpdate ? '更新' : '添加'}商品失败`)
        }

    }

    loadData = async (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        const subCategorys = await this.getCategorys(targetOption.value)
        targetOption.loading = false;


        if (subCategorys && subCategorys.length > 0) {
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))

            targetOption.children = childOptions
        } else {
            targetOption.isLeaf = true
        }

        this.setState({ options: [...this.state.options] })

    }

    UNSAFE_componentWillMount() {
        const product = this.props.location.state
        //设置是否为更新的标识
        this.isUpdate = !!product
        this.product = product || {}
    }


    render() {

        const { isUpdate, product } = this

        const { pCategoryId, categoryId, imgs, detail } = product

        const categoryIds = []

        // debugger

        if (isUpdate) {

            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }
        // console.log(product)
        // console.log(categoryIds)



        const title = (
            <span>
                <LinkButton>
                    <ArrowLeftOutlined style={{ color: 'green', marginRight: 15, fontSize: 20 }} onClick={() => this.props.history.goBack()} />
                </LinkButton>
                <span>{isUpdate ? '修改商品' : '添加商品'}</span>
            </span>
        )

        return (
            <Card title={title}>
                <Form {...layout} ref={this.formRef} onFinish={this.onFinish}>
                    <Item name="name" label="商品名称" initialValue={product.name} rules={[{
                        required: true,
                        message: '商品名称必须输入!'
                    }]}>
                        <Input placeholder="请输入商品名称" />
                    </Item>

                    <Item name="desc" label="商品描述" initialValue={product.desc} rules={[{
                        required: true,
                        message: '商品描述必须输入!',
                    }]}>
                        <TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maRows: 6 }} />
                    </Item>

                    <Item name="price" label="商品价格" initialValue={product.price} rules={[
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

                    <Item name="categoryIds" label="商品分类" initialValue={categoryIds} rules={[{
                        required: true,
                        message: '商品分类必须输入!',
                    }]}>
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                        />
                    </Item>

                    <Item label="商品图片">
                        <PictureWall ref={this.pw} imgs={imgs} />
                    </Item>

                    <Item label="商品详情">
                        <RichTextEditor ref={this.editor} detail={detail} />
                    </Item>

                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>


                </Form>
            </Card >
        )
    }
}
