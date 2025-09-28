import React from "react";
import { Button, Card, Form, Input } from "antd";

export default function LoginPage() {
    const onFinish = () => {};
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card title="Login"className="w-96">
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{required: true}]}>
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}