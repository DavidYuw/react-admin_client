import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.less'

import { Menu } from 'antd'

import * as Icon from '@ant-design/icons'

import logo from "../../assets/images/logo.png"
import menuList from '../../config/menuConfig'


const { SubMenu } = Menu;

class LeftNav extends Component {

    getMenuNodes = (menuList) => {
        const pathname = this.props.location.pathname;

        return menuList.map((item) => {

            const icon = React.createElement(Icon[item.icon])

            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={icon}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            } else {

                const cItem = item.children.find(cItem => cItem.key === pathname)

                if (cItem) {
                    this.openKey = item.key
                }

                return (
                    <SubMenu key={item.key} icon={icon} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {

        const pathname = this.props.location.pathname;
        // console.log(pathname);

        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="" />
                    <h1>硅谷后台</h1>
                </Link>

                <Menu
                    selectedKeys={[pathname]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}

                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)
