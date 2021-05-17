import React, { Component } from 'react'
import { Card, Button, Table, Modal } from 'antd'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button/index'
import { PAGE_SIZE } from '../../utils/constants'
import { reqUsers } from '../../api/index'

export default class User extends Component {

    state = {
        users: [],
        roles: [],
        isShow: false
    }

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'name'
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
                dataIndex: 'role_id'
            },
            {
                title: '操作',
                width: 300,
                render: (user) => (
                    <span>
                        <LinkButton>修改</LinkButton>
                        <LinkButton>删除</LinkButton>
                    </span>
                )
            }
        ]
    }

    addOrUpdateUser = () => {
        console.log("addOrUpdateUser")
    }

    getUsers = async () => {

        const result = await reqUsers()
        if (result === 0) {
            const { users, roles } = result.data
            this.setState({
                users,
                roles
            })
        }
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getUsers()
    }

    render() {

        const { users, isShow } = this.state

        const title = (
            <Button type='primary'>创建用户</Button>
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
                    title="添加用户"
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => this.setState({ isShow: false })}
                >
                    <div>添加、更新界面</div>
                </Modal>


            </Card >
        )
    }
}
