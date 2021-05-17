import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Tree } from 'antd'

import menuList from '../../config/menuConfig'

const Item = Form.Item

export default class AuthForm extends Component {


    static propTypes = {
        role: PropTypes.object
    }

    constructor(props) {
        super(props)
        const { menus } = this.props.role
        this.state = {
            checkedKeys: menus
        }
    }


    onSelect = (selectedKeys, info) => {
        // console.log('selected', selectedKeys, info);
    };

    onCheck = (checkedKeys, info) => {
        // console.log('onCheck', checkedKeys, info);
        this.setState({ checkedKeys })
    };

    getTreeNodes = (menuList) => {
        // debugger
        return menuList.reduce((pre, item) => {
            // console.log("@" + item.children)
            pre.push({
                title: item.title,
                key: item.key,
                children: (item.children ? this.getTreeNodes(item.children) : null)
            })
            return pre
        }, [])
    }

    getMenus = () => {
        return this.state.checkedKeys
    }

    UNSAFE_componentWillMount() {
        this.treeNodes = [{
            title: "平台权限",
            key: "all"
        }]

        this.treeNodes[0].children = this.getTreeNodes(menuList)

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }

    render() {

        const { role } = this.props
        const { checkedKeys } = this.state

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
                    onCheck={this.onCheck}
                    checkedKeys={checkedKeys}
                    treeData={this.treeNodes}
                />
            </div>
        )
    }
}
