import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Select } from 'antd'

const Item = Form.Item
const Option = Select.Option

export default class UserForm extends PureComponent {

    formRef = React.createRef()

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        roles: PropTypes.array.isRequired,
        user: PropTypes.object
    }

    componentDidUpdate() {

        const { user } = this.props
        this.formRef.current.setFieldsValue({
            username: user.username,
            phone: user.phone,
            email: user.email,
            role_id: user.role_id
        })
    }

    componentDidMount() {
        this.props.setForm(this.formRef)
    }

    render() {

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        }

        // debugger

        const { roles, user } = this.props

        // console.log("@", user)

        return (
            <Form ref={this.formRef} {...layout}>
                <Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'new user name must be inputed!',
                        },
                    ]}
                // initialValue={user.username}
                >
                    <Input placeholder="please input user name"></Input>
                </Item>
                {
                    user._id ? null : (
                        <Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'new password must be inputed!',
                                },
                            ]}
                        // initialValue={user.password}
                        >
                            <Input type='password' placeholder="please input password"></Input>
                        </Item>
                    )
                }

                <Item
                    label="手机号"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'new phone must be inputed!',
                        },
                    ]}
                // initialValue={user.phone}
                >
                    <Input placeholder="please input phone"></Input>
                </Item>
                <Item
                    label="邮箱"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'email must be inputed!',
                        },
                    ]}
                // initialValue={user.email}
                >
                    <Input placeholder="please input email"></Input>
                </Item>
                <Item
                    label="角色"
                    name="role_id"
                    rules={[
                        {
                            required: true,
                            message: 'email must be inputed!',
                        },
                    ]}
                // initialValue={user.role_id}
                >
                    <Select>
                        {
                            roles.map((role) => (
                                <Option key={role._id} value={role._id}>{role.name}</Option>
                            ))
                        }
                    </Select>
                </Item>
            </Form>
        )
    }
}
