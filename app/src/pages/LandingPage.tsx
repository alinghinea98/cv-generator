import React from "react";
import { Layout, Row, Col, Typography, Button, Card } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  TrophyOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: 600 }}>
          <FileTextOutlined style={{ color: "#13c2c2", marginRight: 8 }} />
          CVCraft
        </div>
        <Button type="default" onClick={() => navigate("/login")}>
          Sign In
        </Button>
      </Header>

      {/* Hero Section */}
      <Content style={{ padding: "60px 24px" }}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={12}>
            <Title level={2}>
              Turn Your Story into a{" "}
              <span style={{ color: "#13c2c2" }}>Professional CV</span>
            </Title>
            <Paragraph style={{ fontSize: "16px", color: "#595959" }}>
              Create a standout CV in minutes. Simply describe your experience
              in your own words, and we’ll transform it into a polished,
              professional document that gets you noticed.
            </Paragraph>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <Button
                type="primary"
                size="large"
                onClick={() => navigate("/register")}
                icon={<ArrowRightOutlined />}
              >
                Get Started
              </Button>
              <Button size="large">View Sample CVs</Button>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Card
              hoverable
              cover={
                <img
                  alt="Professional CV"
                  src="https://images.unsplash.com/photo-1587287720754-94bac45f0bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                />
              }
            />
          </Col>
        </Row>
      </Content>

      {/* Features Section */}
      <Content style={{ background: "#fafafa", padding: "60px 24px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "40px" }}>
          Why Choose CVCraft?
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card hoverable bordered={false} style={{ textAlign: "center" }}>
              <FileTextOutlined style={{ fontSize: 32, color: "#13c2c2" }} />
              <Title level={4}>Smart Formatting</Title>
              <Paragraph>
                Automatically formats your information into professional,
                ATS-friendly layouts that pass screening systems.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable bordered={false} style={{ textAlign: "center" }}>
              <TeamOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              <Title level={4}>Multiple Templates</Title>
              <Paragraph>
                Choose from various professional templates designed by hiring
                experts to match different industries and roles.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable bordered={false} style={{ textAlign: "center" }}>
              <TrophyOutlined style={{ fontSize: 32, color: "#722ed1" }} />
              <Title level={4}>Instant Preview</Title>
              <Paragraph>
                See your CV come to life in real-time as you input your
                information, with instant formatting and layout adjustments.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>

      {/* CTA Section */}
      <Content style={{ padding: "60px 24px", textAlign: "center" }}>
        <Title level={3}>Ready to Create Your Professional CV?</Title>
        <Paragraph style={{ maxWidth: 600, margin: "0 auto 24px" }}>
          Join thousands of job seekers who have landed their dream jobs with
          CVs created using our platform.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/register")}
          icon={<ArrowRightOutlined />}
        >
          Start Building Your CV
        </Button>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: "center", borderTop: "1px solid #f0f0f0" }}>
        CVCraft ©{new Date().getFullYear()} | Privacy Policy | Terms of Service
      </Footer>
    </Layout>
  );
}
