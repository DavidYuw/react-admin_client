import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Select, Input } from 'antd'

const Item = Form.Item
const Option = Select.Option

export default class AddForm extends Component {

    formRef = React.createRef()

    static propTypes = {
        category: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
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

        const { category, parentId } = this.props

        return (
            <Form ref={this.formRef} >
                <Item
                    name="parentId"
                    initialValue={parentId}
                >
                    <Select>
                        <Option key="0" value="0">一级分类</Option>
                        {
                            category.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)
                        }
                    </Select>
                </Item>
                <Item
                    name="categoryName"
                    initialValue=''
                >
                    <Input placeholder="please input category name"></Input>
                </Item>
            </Form>
        )
    }
}