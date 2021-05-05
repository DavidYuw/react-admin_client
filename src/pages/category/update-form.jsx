import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input } from 'antd'

const Item = Form.Item

class UpdateForm extends Component {

    formRef = React.createRef()

    state={}

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

   

    componentDidMount(){
        // console.log("componentDidMount",this.formRef)
        this.props.setForm(this.formRef)
    }
 
    componentDidUpdate(){        
        this.formRef.current.setFieldsValue({ categoryName: this.props.categoryName })      
    }

    render() {

        return (
            <Form ref={this.formRef} >
                <Item
                    name="categoryName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input category!',
                        },
                    ]}
                    initialValue={this.props.categoryName}
                >
                    <Input placeholder="please input category name" ></Input>
                </Item>
            </Form>
        )
    }


};

export default UpdateForm