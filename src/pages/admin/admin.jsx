import React, { Component } from 'react'

import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom'

import { Layout } from 'antd';

import LeftNav from '../../components/left-nav'
import RightHeader from '../../components/right-header'


const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {

    render() {
        const user = memoryUtils.user

        // console.log(memoryUtils);

        if (!user || !user._id) {
            return <Redirect to='/login' />
        }

        return (
            <Layout style={{ height: '100%' }}>
                <Sider><LeftNav /></Sider>
                <Layout>
                    <RightHeader />
                    <Content>Content</Content>
                    <Footer style={{ textAlign: "center", color: "#cccccc" }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验。</Footer>
                </Layout>
            </Layout>
        )


    }
}