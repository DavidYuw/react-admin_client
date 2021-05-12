import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd';

import {
    PlusOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';

import LinkButton from '../../components/link-button'
import { reqCategory, reqUpdateCategory, reqAddCategory } from '../../api/index'
import AddForm from './add-form'
import UpdateForm from './update-form'

export default class Category extends Component {

    state = {
        loading: false,
        category: [],
        subCategory: [],
        parentId: '0',
        parentName: '',
        showState: 0, //0 both hide ,1 add modal show, 2 modify modal show
    }

    showCategory = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategory: [],
        })
    }

    showSubCategory = (rowItem) => {
        this.setState({
            parentId: rowItem._id,
            parentName: rowItem.name,
        }, () => {
            this.getCategory(1)
        })
    }

    initColumList = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name'
            },
            {
                title: '操作',
                width: 300,
                render: (rowItem) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdateCategory(rowItem)}>修改分类</LinkButton>
                        {this.state.parentId === '0' ? <LinkButton onClick={() => this.showSubCategory(rowItem)}>查看子分类</LinkButton> : null}
                    </span>
                )
            }
        ]
    }

    UNSAFE_componentWillMount() {
        this.initColumList()
    }

    getCategory = async (pageNum, parentId) => {
        this.pageNum = pageNum

        this.setState({ loading: true })

        parentId = parentId || this.state.parentId
        const result = await reqCategory(parentId)

        this.setState({ loading: false })

        if (result.status === 0) {
            if (parentId === '0') {
                this.setState({ category: result.data })
            } else {
                this.setState({ subCategory: result.data })
            }
        } else {
            message.error('get category fail...')
        }
    }

    handleCancel = () => {
        this.setState({
            showState: 0
        })
        this.form.current.resetFields()

    }

    showAddCategory = () => {

        this.setState({
            showState: 1
        })
    }

    addCategory = () => {

        console.log("addcatefory()")

        this.form.current.validateFields()
            .then(async values => {
                this.setState({
                    showState: 0
                })

                const { parentId, categoryName } = values

                this.form.current.resetFields()

                console.log(parentId, categoryName)

                const result = await reqAddCategory(categoryName, parentId)

                if (result.status === 0) {
                    if (parentId === this.state.parentId) {
                        this.getCategory()
                    } else if (parentId === '0') {
                        this.getCategory('0')
                    }
                }
            }).catch(errinfo => {
                console.log(errinfo)
            })
    }

    showUpdateCategory = (rowItem) => {
        this.rowItem = rowItem

        this.setState({
            showState: 2
        })
    }

    updateCategory = () => {

        // console.log('@ updateCategory')

        this.form.current.validateFields()
            .then(async values => {
                this.setState({
                    showState: 0
                })

                const categoryId = this.rowItem._id
                const { categoryName } = values

                const result = await reqUpdateCategory(categoryId, categoryName)

                if (result.status === 0) {
                    this.getCategory()
                }

            }).catch(errinfo => {
                console.log(errinfo)
            }).finally()
    }

    componentDidMount() {
        this.getCategory(1)
    }


    render() {

        // console.log("@", this.pageNum)

        const { category, subCategory, parentId, parentName, loading, showState } = this.state

        const rowItem = this.rowItem || { name: '' }

        const title = parentId === '0' ? "一级分类列表" : (
            <span>
                <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
                <ArrowRightOutlined style={{ marginRight: 10 }} />
                <span>{parentName}</span>
            </span>
        )



        const extra = (
            <Button type='primary' onClick={this.showAddCategory}>
                <PlusOutlined /> 添加
            </Button>
        )

        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    rowKey="_id"
                    loading={loading}
                    dataSource={parentId === '0' ? category : subCategory}
                    columns={this.columns}
                    pagination={{ defaultPageSize: 2, showQuickJumper: true, current: this.pageNum, onChange: this.getCategory }}
                />

                <Modal title="添加分类" visible={showState === 1} onOk={this.addCategory} onCancel={this.handleCancel}  >
                    <AddForm category={category} parentId={parentId} setForm={(form) => { this.form = form }}></AddForm>
                </Modal>

                <Modal title="修改分类" visible={showState === 2} onOk={this.updateCategory} onCancel={this.handleCancel} >
                    <UpdateForm categoryName={rowItem.name} setForm={(form) => { this.form = form }}></UpdateForm>
                </Modal>
            </Card>
        )
    }
}
