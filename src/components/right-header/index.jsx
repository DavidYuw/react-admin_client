import React, { Component } from 'react'
import './index.less'

export default class RightHeader extends Component {
    render() {
        return (
            <div className="right-header">
                <div className="right-header-top">
                    <span> 欢迎， admin</span>
                    <a href="#!">退出</a>
                </div>
                <div className="right-header-bottom">
                    <div className="right-header-bottom-left">首页</div>
                    <div className="right-header-bottom-right">
                        <span>2019-5-16 10:12:36</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather"></img>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
