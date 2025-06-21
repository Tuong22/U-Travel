"use client"

import { useState } from "react"
import {
  Layout,
  Avatar,
  Button,
  Input,
  Form,
  Card,
  Upload,
  Space,
  Divider,
  Menu,
  Typography,
  Row,
  Col,
  message,
} from "antd"
import {
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  EditOutlined,
  CloseOutlined,
  UploadOutlined,
  FileTextOutlined,
  GlobalOutlined,
  StarOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons"

const { Sider, Content } = Layout
const { Title, Text } = Typography

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [isEditable, setIsEditable] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = (values) => {
    console.log("Form values:", values)
    message.success("Information submitted successfully!")
  }

  const toggleEdit = () => {
    setIsEditable(!isEditable)
    if (isEditable) {
      form.resetFields()
    }
  }

  const handleUpload = ({ file, onSuccess }) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setAvatarUrl(e.target?.result)
      onSuccess?.("ok")
    }
    reader.readAsDataURL(file)
  }

  const removeAvatar = () => {
    setAvatarUrl(null)
    message.info("Avatar removed")
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
  }

  const menuItems = [
    {
      key: "edit-profile",
      icon: <FileTextOutlined />,
      label: "Edit Profile",
      style: { backgroundColor: "#e6f4ff", color: "#1677ff" },
    },
    {
      key: "divider1",
      type: "divider",
    },
    {
      key: "created-trips",
      icon: <GlobalOutlined />,
      label: "Created Trips",
    },
    {
      key: "divider2",
      type: "divider",
    },
    {
      key: "favorite-places",
      icon: <StarOutlined />,
      label: "Favorite Places",
    },
  ]

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar */}
      <Sider
        width={320}
        style={{
          backgroundColor: "#fff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          borderRight: "1px solid #f0f0f0",
        }}
      >
        <div style={{ padding: "24px" }}>
          {/* Top Section with Avatar and Icons */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}
            >
              <Avatar size={48} src={avatarUrl} icon={<UserOutlined />} style={{ backgroundColor: "#f0f0f0" }} />
              <Space>
                <Button type="text" icon={<SettingOutlined />} size="small" style={{ color: "#666" }} />
                <Button type="text" icon={<BellOutlined />} size="small" style={{ color: "#666" }} />
              </Space>
            </div>

            {/* Search Bar */}
            <Input
              placeholder="Search for..."
              prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
              style={{ backgroundColor: "#fafafa" }}
            />
          </div>

          {/* Navigation Menu */}
          <Menu
            mode="vertical"
            selectedKeys={["edit-profile"]}
            items={menuItems}
            style={{ border: "none", backgroundColor: "transparent" }}
          />
        </div>
      </Sider>

      {/* Main Content */}
      <Content style={{ padding: "32px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <Card
            title={
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Title level={2} style={{ margin: 0, color: "#262626" }}>
                  User Profile
                </Title>
                <Button
                  type={isEditable ? "primary" : "default"}
                  danger={isEditable}
                  icon={isEditable ? <CloseOutlined /> : <EditOutlined />}
                  onClick={toggleEdit}
                >
                  {isEditable ? "Cancel" : "Edit"}
                </Button>
              </div>
            }
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
          >
            <Form form={form} layout="vertical" onFinish={handleSubmit} disabled={!isEditable}>
              {/* Profile Photo Section */}
              <div style={{ marginBottom: "32px" }}>
                <Title level={4} style={{ marginBottom: "16px" }}>
                  Profile Photo
                </Title>
                <Row gutter={24} align="top">
                  <Col>
                    <Avatar size={96} src={avatarUrl} icon={<UserOutlined />} style={{ backgroundColor: "#f0f0f0" }} />
                  </Col>
                  <Col flex={1}>
                    <Space direction="vertical" size="small">
                      <Upload
                        customRequest={handleUpload}
                        beforeUpload={beforeUpload}
                        showUploadList={false}
                        disabled={!isEditable}
                      >
                        <Button icon={<UploadOutlined />} disabled={!isEditable}>
                          Upload Photo
                        </Button>
                      </Upload>
                      <Button
                        type="link"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={removeAvatar}
                        disabled={!isEditable || !avatarUrl}
                        style={{ padding: 0, height: "auto" }}
                      >
                        Remove
                      </Button>
                    </Space>
                  </Col>
                  <Col>
                    <Card size="small" style={{ backgroundColor: "#fafafa", border: "1px solid #f0f0f0" }}>
                      <Text strong style={{ display: "block", marginBottom: "8px" }}>
                        Image requirements:
                      </Text>
                      <div style={{ fontSize: "12px", color: "#666", lineHeight: "1.5" }}>
                        <div>• Min. 400x400px</div>
                        <div>• Max. 2MB</div>
                        <div>• Your face or company logo</div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>

              <Divider />

              {/* User Details Section */}
              <div>
                <Title level={4} style={{ marginBottom: "24px" }}>
                  User Details
                </Title>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true, message: "Please input your first name!" }]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true, message: "Please input your last name!" }]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: "Please input your phone number!" }]}
                >
                  <Input placeholder="Phone Number" />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Address"
                  rules={[{ required: true, message: "Please input your address!" }]}
                >
                  <Input placeholder="Address" />
                </Form.Item>
              </div>

              <div style={{ paddingTop: "24px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!isEditable}
                  size="large"
                  style={{ minWidth: "120px" }}
                >
                  Submit Changes
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </Content>
    </Layout>
  )
}

export default ProfilePage
