import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'
import { PAGE_SIZE } from '../../utils/constants'

import { reqRoles, reqAddRole } from '../../api/index'
import AddForm from './add-form'
import AuthForm from './auth-form'

export default class Role extends Component {

    state = {
        roles: [],
        role: {},
        isShowAdd: false,
        isShowAuth: false
    }

    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time'
            }, {
                title: '授权时间',
                dataIndex: 'auth_time'
            }, {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }

    getRoles = async () => {
        const result = await reqRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({
                roles
            })
        }
    }

    addRole = () => {
        // console.log("addRole", this.form)
        this.form.current.validateFields()
            .then(async values => {

                this.setState({
                    isShowAdd: false
                })
                // console.log(values)
                const { valueName } = values
                this.form.current.resetFields()

                const result = await reqAddRole(valueName)

                if (result.status === 0) {
                    message.success("添加角色成功")

                    //更新方法一
                    // this.getRoles()

                    //更新方法二
                    const role = result.data
                    this.setState((state) => ({
                        roles: [...state.roles, role]
                    }))
                } else {
                    message.error("添加角色失败")
                }



            }).catch(errinfo => {
                console.log(errinfo)
            })
    }

    updateRole = () => {
        console.log("@@@")
    }

    UNSAFE_componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getRoles()
    }

    onRow = (role) => {
        return {
            onClick: (event) => {
                // console.log(role)
                this.setState({
                    role
                })
            }
        }
    }

    render() {

        const { roles, role, isShowAdd, isShowAuth } = this.state

        const title = (
            <span>
                <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button>&nbsp;&nbsp;
                <Button type="primary" disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })}>设置角色权限</Button>
            </span>
        )

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={roles}
                    columns={this.columns}
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                    rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
                    onRow={this.onRow}
                />

                <Modal
                    title="添加角色"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({ isShowAdd: false })
                        this.form.current.resetFields()
                    }} >
                    <AddForm setForm={(form) => { this.form = form }}></AddForm>
                </Modal>

                <Modal
                    title="设置角色权限"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({ isShowAuth: false })
                    }} >
                    <AuthForm role={role} />
                </Modal>

            </Card>
        )
    }
}
