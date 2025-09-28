import React from "react";
import { Button, Card, Form, Input, message } from "antd";
import { AuthControllerApi } from "../generated/api-client/apis/AuthControllerApi";
import { LoginRequest } from "../generated/api-client/models/LoginRequest";

export default function LoginPage() {
    const api = new AuthControllerApi();
    const onFinish = async (values: {email: string; password: string}) => {
        try {
            const loginRequest: LoginRequest = {
                email: values.email,
                password: values.password,
              };
              const authResponse = await api.login({ loginRequest });
            message.success("Login successful");
            localStorage.setItem("token", authResponse.token
            );
        }
        catch (err) {
            console.error("Login failed", err);
            message.error("Login failed");
        }
    };
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