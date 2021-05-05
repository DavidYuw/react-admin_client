import React from 'react'

import { Form, Select, Input } from 'antd'

const Item = Form.Item
const Option = Select.Option

// export default class AddForm extends Component {
//     render() {
//         return (
//             <Form>
//                 <Item>
//                     <Select>
//                         <Option value="0">一级分类</Option>
//                         <Option value="1">电脑</Option>
//                         <Option value="2">图书</Option>
//                     </Select>
//                 </Item>
//                 <Item>
//                     <Input placeholder="please input category name"></Input>
//                 </Item>
//             </Form>
//         )
//     }
// }

const AddForm = () => {

    return (
        <Form>
            <Item
                name="parentId"
                // initialValue={['0']}
                initialValue ='2'
            >
                <Select>
                    <Option value="0">一级分类</Option>
                    <Option value="1">电脑</Option>
                    <Option value="2">图书</Option>
                </Select>
            </Item>

            <Item
                name="parentName"
                rules={[
                    {
                        required: true,
                        message: 'Please input category!',
                    },
                ]}
            >
                <Input placeholder="please input category name"></Input>
            </Item>
        </Form>
    );
};

export default AddForm