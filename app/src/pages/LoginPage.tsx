import React from "react";
import {Button, Card, Col, Form, Input, message, Row} from "antd";
import {AuthControllerApi} from "../generated/api-client/apis/AuthControllerApi";
import {LoginRequest} from "../generated/api-client/models/LoginRequest";

export default function LoginPage() {
  const api = new AuthControllerApi();
  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const loginRequest: LoginRequest = {
        email: values.email,
        password: values.password,
      };
      const authResponse = await api.login({loginRequest});
      message.success("Login successful");
      localStorage.setItem("token", authResponse.token
      );
    } catch (err) {
      console.error("Login failed", err);
      message.error("Login failed");
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{minHeight: "100vh", backgroundColor: "#f5f5f5"}}
    >
      <Col>
        <Card title="Login" style={{width: 380}}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{required: true, message: "Please enter your email"}]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{required: true, message: "Please enter your password"}]}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}