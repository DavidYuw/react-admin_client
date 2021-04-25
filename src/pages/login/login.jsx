import React, { Component } from 'react'

import './login.less'
import logo from './images/logo.png'

import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { reqLogin } from '../../api'

const NormalLoginForm = () => {
    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        const { username, password } = values;
        reqLogin(username, password).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                    {
                        min: 4,
                        message: 'the min value is 4'
                    },
                    {
                        max: 12,
                        message: 'the max value is 12'
                    },
                    {
                        pattern: /^[a-zA-Z0-9_]+$/,
                        message: 'the username is made of a-z A-Z or _'
                    }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    // {
                    //     required: true,
                    //     message: 'Please input your Password!',
                    // }
                    {
                        validator: (_, value) => {
                            // value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            if (!value) {
                                return Promise.reject(new Error('Password cannot be empty'));
                            } else if (value.length < 4) {
                                return Promise.reject(new Error('Password min value is 4'));
                            } else if (value.length > 12) {
                                return Promise.reject(new Error('Password min value is 12'));
                            } else if (!/^[a-zA-Z_]+$.test(value)/) {
                                return Promise.reject(new Error('the password is made of a-z A-Z or _'));
                            } else {
                                return Promise.resolve();
                            }

                        }
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>

            </Form.Item>
        </Form>
    );
};

export default class Login extends Component {

    render() {

        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt='logo' />
                    <h1>FRI Project Management System</h1>
                </header>
                <section className='login-content'>
                    <h2>User Login</h2>

                    <NormalLoginForm />
                </section>
            </div>
        )
    }
}