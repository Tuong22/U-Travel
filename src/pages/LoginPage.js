"use client"

import { useState } from "react"
import { Form, Input, Button, Checkbox, Divider, Space, Typography, Row, Col, message } from "antd"
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  AppleOutlined,
  TwitterOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons"
import { useAuth } from "../components/ProtectedRoute/AuthContext"

const { Title, Text, Link } = Typography


const LoginPage = () => {
  const [modal, setModal] = useState("login") // Start with login modal open
  const [loginForm] = Form.useForm()
  const [signupForm] = Form.useForm()
  const [resetForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()

  const closeModal = () => {
    // Don't allow closing modal when not authenticated
    return
  }

  const handleLogin = async (values) => {
    setLoading(true)
    try {
      const success = await login(values.email, values.password)
      if (success) {
        message.success("Login successful!")
        setModal(null)
      } else {
        message.error("Invalid email or password!")
      }
    } catch (error) {
      message.error("Login failed!")
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (values) => {
    setLoading(true)
    try {
      const success = await signup(values)
      if (success) {
        message.success("Account created successfully!")
        setModal(null)
      } else {
        message.error("Signup failed!")
      }
    } catch (error) {
      message.error("Signup failed!")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = (values) => {
    console.log("Reset values:", values)
    message.success("Reset link sent to your email!")
    setModal("login")
  }

  const handleSocialLogin = (provider) => {
    message.info(`${provider} login will be implemented soon`)
  }

  const switchToSignup = () => {
    setModal("signup")
    loginForm.resetFields()
  }

  const switchToLogin = () => {
    setModal("login")
    signupForm.resetFields()
  }

  const switchToReset = () => {
    setModal("reset")
    loginForm.resetFields()
  }

  const SocialButtons = () => (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Button
        block
        size="large"
        icon={<GoogleOutlined />}
        onClick={() => handleSocialLogin("Google")}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Continue with Google
      </Button>
      <Button
        block
        size="large"
        icon={<AppleOutlined />}
        onClick={() => handleSocialLogin("Apple")}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Continue with Apple
      </Button>
      <Button
        block
        size="large"
        icon={<TwitterOutlined />}
        onClick={() => handleSocialLogin("Twitter")}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        Continue with Twitter
      </Button>
    </Space>
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          margin: "20px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Title level={1} style={{ marginBottom: "8px", color: "#1677ff" }}>
            Welcome
          </Title>
          <Text type="secondary">Please sign in to continue</Text>
        </div>

        {/* Login Form */}
        {modal === "login" && (
          <div>
            <Form form={loginForm} layout="vertical" onFinish={handleLogin} size="large">
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
                <Col>
                  <Form.Item name="remember" valuePropName="checked" style={{ margin: 0 }}>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                </Col>
                <Col>
                  <Link onClick={switchToReset}>Forgot Password?</Link>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                  Log In
                </Button>
              </Form.Item>
            </Form>

            <Divider>Or continue with</Divider>
            <SocialButtons />
            <Divider />

            <div style={{ textAlign: "center" }}>
              <Text>
                Don't have an account?{" "}
                <Link onClick={switchToSignup} style={{ fontWeight: "500" }}>
                  Sign Up
                </Link>
              </Text>
            </div>
          </div>
        )}

        {/* Signup Form */}
        {modal === "signup" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Title level={3}>Create Account</Title>
              <Text type="secondary">Join us today</Text>
            </div>

            <Form form={signupForm} layout="vertical" onFinish={handleSignup} size="large">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: "Please input your first name!" }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: "Please input your last name!" }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { min: 8, message: "Password must be at least 8 characters!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[{ required: true, message: "Please accept the terms!" }]}
              >
                <Checkbox>I agree to the Terms of Service and Privacy Policy</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                  Create Account
                </Button>
              </Form.Item>
            </Form>

            <Divider>Or continue with</Divider>
            <SocialButtons />
            <Divider />

            <div style={{ textAlign: "center" }}>
              <Text>
                Already have an account?{" "}
                <Link onClick={switchToLogin} style={{ fontWeight: "500" }}>
                  Sign In
                </Link>
              </Text>
            </div>
          </div>
        )}

        {/* Reset Password Form */}
        {modal === "reset" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <Title level={3}>Reset Password</Title>
              <Text type="secondary">We'll send you a reset link</Text>
            </div>

            <Form form={resetForm} layout="vertical" onFinish={handleReset} size="large">
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter your email address" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                  Send Reset Link
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Text>
                Remember your password?{" "}
                <Link onClick={switchToLogin} style={{ fontWeight: "500" }}>
                  Back to Sign In
                </Link>
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginPage
