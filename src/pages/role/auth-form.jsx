import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Tree } from 'antd'

import menuList from '../../config/menuConfig'

const Item = Form.Item

export default class AuthForm extends Component {


    static propTypes = {
        role: PropTypes.object
    }

    treeData = [
        {
            title: '平台权限',
            key: 'all',
            children: [
                {
                    title: 'parent 1-0',
                    key: '0-0-0',
                    disabled: true,
                    children: [
                        {
                            title: 'leaf',
                            key: '0-0-0-0',
                            disableCheckbox: true,
                        },
                        {
                            title: 'leaf',
                            key: '0-0-0-1',
                        },
                    ],
                },
                {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    children: [
                        {
                            title: (
                                <span
                                    style={{
                                        color: '#1890ff',
                                    }}
                                >
                                    sss
                                </span>
                            ),
                            key: '0-0-1-0',
                        },
                    ],
                },
            ],
        },
    ];

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    };

    getTreeNodes = () => {
        return menuList.reduce((pre, item) => {
            console.log(item.children)
            pre.push({
                title: item.title,
                key: item.key,
                // children: (item.children ? this.getTreeNodes(item.children) : null)
            })
            return pre
        }, [])
    }

    UNSAFE_componentWillMount() {
        this.treeNodes = this.getTreeNodes(menuList)

        console.log(this.treeNodes)
    }

    render() {

        const { role } = this.props

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        }
        return (
            <div>
                <Item label='角色名称' {...formItemLayout}>
                    <Input value={role.name} disabled />
                </Item>

                <Tree
                    checkable
                    defaultExpandAll={true}
                    treeData={this.treeData}
                />
            </div>
        )
    }
}
