import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import './index.less'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storeUtils from '../../utils/storeUtils'
import menuList from '../../config/menuConfig'

class RightHeader extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        dayPicUrl: "http://api.map.baidu.com/images/weather/day/qing.png",
        weather: "晴"
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }


    getTitle = () => {

        const pathname = this.props.location.pathname
        let title

        // debugger;

        menuList.forEach((item) => {
            if (item.key === pathname) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find((item) => item.key === pathname)
                if (cItem) {
                    title = cItem.title
                }
            }
        })

        return title
    }

    logout = () => {
        Modal.confirm({

            content: 'Are you sure want to logout?',
            onOk: () => {
                // console.log('OK')
                storeUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            }
        });
    }

    componentDidMount() {

        this.getTime()
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render() {

        let title = this.getTitle()
        // console.log(title)

        const username = memoryUtils.user.username

        return (
            <div className="right-header">
                <div className="right-header-top">
                    <span> 欢迎， {username}</span>
                    <a href="#!" onClick={this.logout}>退出</a>
                </div>
                <div className="right-header-bottom">
                    <div className="right-header-bottom-left">{title}</div>
                    <div className="right-header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src={this.state.dayPicUrl} alt="weather"></img>
                        <span>{this.state.weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(RightHeader)