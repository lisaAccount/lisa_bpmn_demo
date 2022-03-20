import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from "antd";


export default class PersonInfo extends Component {

    initFormOnchange = element => {
        console.log("first");
    };

    onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };
    onFinish = () => {
        console.log("onfinish");
    };

    //  将表单改变的属性值更新到XML上
    handleValue = curValue => {
        const { bpmnModeler } = this.props;
        const element = bpmnModeler.get("elementRegistry");
    };

    render() {
        return (
            <div>
                <Form
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={() => {
                        this.onFinish();
                    }}
                    onFinishFailed={() => {
                        this.onFinishFailed();
                    }}
                    autoComplete='off'
                    onValuesChange={(curValue, allValue) => {
                        this.handleValue(curValue);
                    }}
                >
                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[{ required: true, message: "Please input your username!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
