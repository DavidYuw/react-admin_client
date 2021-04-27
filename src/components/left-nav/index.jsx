import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.less'

import { Menu } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';


import logo from "../../assets/images/logo.png"
import meneList from "../../config/menuConfig"
import menuList from '../../config/menuConfig';


const { SubMenu } = Menu;

export default class LeftNav extends Component {

    getMenuNodes = (menuList) => {
        return menuList.map((item) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key} icon={<MailOutlined  />}>
                        <Link to={item.key}>{item.title}</Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.key} icon={<MailOutlined  />} title={item.title}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    render() {
        return (
            <div to="/" className="left-nav">
                <Link className="left-nav-header">
                    <img src={logo} alt="" />
                    <h1>硅谷后台</h1>
                </Link>
               
                <Menu
                    mode="inline"
                    theme="dark"
                >
                    {this.getMenuNodes(meneList)}

                </Menu>
            </div>
        )
    }
}
