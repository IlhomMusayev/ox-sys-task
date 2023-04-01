import useToken from "../../../hooks/useToken";
import React, { useState } from "react";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import FormData from "form-data";
import AuthApi from "api/AuthApi";
import { subdomain } from "configs/constants";

export default function Login() {
  const [setToken] = useToken(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Login function with form data
  const onFinish = async (values) => {
    setLoading(true);
    try {
      var formData = new FormData();
      formData.append("_username", values.username);
      formData.append("_password", values.password);
      formData.append("_subdomain", subdomain);

      AuthApi.login(formData)
        .then((res) => {
          console.log(res);
          message.success("Login success");
          setToken(res.token);
          setLoading(false);
        })
        .catch((err) => {
          message.error(err.message);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <Col xs={20} sm={20} md={20} lg={8}>
            <Card>
              <Row justify="center">
                <Col xs={24} sm={24} md={20} lg={20}>
                  <h2>Login</h2>
                  <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    form={form}
                  >
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={
                          <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder={"Password"}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                      >
                        Sign in
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
