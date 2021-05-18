import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button/index'
import { PAGE_SIZE } from '../../utils/constants'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api/index'
import UserForm from './user-form'

export default class User extends Component {

    state = {
        users: [],
        roles: [],
        isShow: false
    }

    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            onOk: async () => {
                // console.log("ok")
                const result = await reqDeleteUser(user._id)
                if (result.status === 0) {
                    message.success("删除用户成功")
                    this.getUsers()
                } else {
                    message.error("删除用户失败")
                }
            }
        })
    }

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateDate
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                // render: (role_id) => this.state.roles.find(item => item._id === role_id).name
                render: role_id => this.roleNames[role_id]
            },
            {
                title: '操作',
                width: 300,
                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
                        <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                    </span>
                )
            }
        ]
    }

    addOrUpdateUser = async () => {
        // console.log("addOrUpdateUser", this.form.current.getFieldsValue())

        this.setState({ isShow: false })
        const user = this.form.current.getFieldsValue()

        this.form.current.resetFields()

        if (this.user) {
            user._id = this.user._id
        }


        const result = await reqAddOrUpdateUser(user)

        if (result.status === 0) {
            message.success(`${this.user ? '修改' : '添加'}用户成功！`)
            this.getUsers()
        } else {
            message.error(`${this.user ? '修改' : '添加'}用户失败！`)
        }

    }

    initRoleNames = (roles) => {
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        this.roleNames = roleNames
    }

    getUsers = async () => {

        const result = await reqUsers()

        if (result.status === 0) {
            const { users, roles } = result.data
            this.initRoleNames(roles)
            this.setState({
                users,
                roles
            })
        }
    }

    showUpdate = (user) => {
        // console.log("showUpdate", this.form.current.getFieldsValue())
        this.user = user
        this.setState({ isShow: true })
    }

    showAdd = () => {
        // console.log("showAdd", this.form.current.getFieldsValue())
        this.user = null
        this.setState({ isShow: true })
    }

    handleCancel = () => {

        // console.log("222")
        // this.user = null
        // this.form.current.resetFields()
        this.setState({ isShow: false })
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }


    componentDidMount() {
        this.getUsers()
    }

    render() {

        // debugger

        const { users, isShow, roles } = this.state
        const user = this.user || {}

        const title = (
            <Button type='primary' onClick={this.showAdd}>创建用户</Button>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={users}
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                />

                <Modal
                    forceRender
                    title={user._id ? "修改用户" : "添加用户"}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={this.handleCancel}
                >
                    <UserForm setForm={(form) => { this.form = form }} roles={roles} user={user}></UserForm>
                </Modal>


            </Card >
        )
    }
}
