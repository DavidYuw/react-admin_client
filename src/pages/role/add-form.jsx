import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input } from 'antd'

const Item = Form.Item

export default class AddForm extends Component {

    formRef = React.createRef()

    static propTypes = {
        setForm: PropTypes.func.isRequired
    }

    componentDidMount() {
        // console.log("componentDidMount",this.formRef)
        this.props.setForm(this.formRef)
    }

    componentDidUpdate() {
        this.formRef.current.setFieldsValue({ parentId: this.props.parentId })
    }

    render() {

        return (
            <Form ref={this.formRef} >
                <Item
                    label="角色名称"
                    name="roleName"
                    rules={[
                        {
                            required: true,
                            message: 'new role name must be inputed!',
                        },
                    ]}
                    initialValue=''
                >
                    <Input placeholder="please input role name"></Input>
                </Item>
            </Form>
        )
    }
}