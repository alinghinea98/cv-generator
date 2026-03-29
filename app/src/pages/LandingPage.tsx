import React from "react";
import { Layout, Row, Col, Typography, Button, Card, Space } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  TrophyOutlined,
  ArrowRightOutlined,
  StarOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import AnimatedStatistic from "../components/AnimatedStatistic";

const { Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Free CV Builder — Create a Professional CV Online | Make me CV"
        description="Create a professional CV online in minutes with ATS-friendly templates and instant PDF download. Start building your CV now."
        keywords="free CV builder, create CV online free, free resume generator, resume builder, CV generator, ATS friendly CV"
        url="https://makemecv.org/"
      />
      <div className="modern-landing">
      <Content className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="hero-content">
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} md={12}>
              <div className="hero-text">
                <Text className="hero-badge">
                  <StarOutlined className="animated-star" /> Fast, professional, ATS-friendly
                </Text>
                <Title level={1} className="hero-title">
                  Turn Your Story into a{" "}
                  <span className="gradient-text">Professional CV</span>
                </Title>
                <Paragraph className="hero-description">
                  Create a standout CV in minutes. Simply describe your experience
                  in your own words, and we'll transform it into a polished,
                  professional document that gets you noticed by top employers.
                </Paragraph>
                <Space size="large" className="hero-actions">
                  <Button
                    type="primary"
                    size="large"
                    className="primary-cta"
                    onClick={() => navigate("/free-cv-builder")}
                    icon={<RocketOutlined />}
                  >
                    Start Building Now
                  </Button>
                  <Button size="large" disabled className="secondary-btn">
                    View Examples
                  </Button>
                </Space>
                <div className="trust-indicators">
                  <div className="trust-item">
                    <CheckCircleOutlined className="check-icon" />
                    <Text>Instant PDF download</Text>
                  </div>
                  <div className="trust-item">
                    <CheckCircleOutlined className="check-icon" />
                    <Text>No credit card required</Text>
                  </div>
                  <div className="trust-item">
                    <CheckCircleOutlined className="check-icon" />
                    <Text>5-minute setup</Text>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="hero-visual">
                <div className="cv-mockup">
                  <div className="mockup-header">
                    <div className="mockup-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div className="mockup-content">
                    <div className="mockup-section">
                      <div className="section-header"></div>
                      <div className="section-lines">
                        <div className="line long"></div>
                        <div className="line medium"></div>
                        <div className="line short"></div>
                      </div>
                    </div>
                    <div className="mockup-section">
                      <div className="section-header"></div>
                      <div className="section-lines">
                        <div className="line long"></div>
                        <div className="line medium"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="floating-card card-1">
                  <TrophyOutlined />
                  <Text>ATS Optimized</Text>
                </div>
                <div className="floating-card card-2">
                  <HeartOutlined />
                  <Text>HR Approved</Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Content>

      <Content className="stats-section">
        <Row gutter={[32, 32]} justify="center">
          <Col xs={12} md={6}>
            <AnimatedStatistic
              title="CVs Created"
              value={50000}
              suffix="+"
            />
          </Col>
          <Col xs={12} md={6}>
            <AnimatedStatistic
              title="Success Rate"
              value={85}
              suffix="%"
            />
          </Col>
          <Col xs={12} md={6}>
            <AnimatedStatistic
              title="Templates"
              value={25}
              suffix="+"
            />
          </Col>
          <Col xs={12} md={6}>
            <AnimatedStatistic
              title="Countries"
              value={50}
              suffix="+"
            />
          </Col>
        </Row>
      </Content>

      <Content className="features-section">
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Card className="feature-card" hoverable>
              <div className="feature-icon">
                <FileTextOutlined />
              </div>
              <Title level={4} className="feature-title">Smart Formatting</Title>
              <Paragraph className="feature-description">
                Automatically formats your information into professional,
                ATS-friendly layouts that pass screening systems with ease.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="feature-card" hoverable>
              <div className="feature-icon">
                <TeamOutlined />
              </div>
              <Title level={4} className="feature-title">Multiple Templates</Title>
              <Paragraph className="feature-description">
                Choose from various professional templates designed by hiring
                experts to match different industries and career levels.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className="feature-card" hoverable>
              <div className="feature-icon">
                <TrophyOutlined />
              </div>
              <Title level={4} className="feature-title">Instant Preview</Title>
              <Paragraph className="feature-description">
                See your CV come to life in real-time as you input your
                information, with instant formatting and layout adjustments.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>

      <Content className="cta-section">
        <div className="cta-background">
          <div className="cta-gradient"></div>
        </div>
        <div className="cta-content">
          <Title level={2} className="cta-title">
            Ready to Create Your Professional CV?
          </Title>
          <Paragraph className="cta-description">
            Join thousands of job seekers who have landed their dream jobs with
            CVs created using our platform. Start building yours today.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            className="cta-button"
            onClick={() => navigate("/free-cv-builder")}
            icon={<ArrowRightOutlined />}
          >
            Start Building Your CV
          </Button>
        </div>
      </Content>

      <Footer className="modern-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <img src="/favicon.ico" alt="Logo" className="logo-icon" width={24} height={24}/>
              <span className="logo-text">MakeMeCV</span>
            </div>
            <Text className="footer-tagline">
              Professional CVs made simple
            </Text>
          </div>
          <div className="footer-links">
            <a href="https://makemecv.org/privacy-policy" className="footer-link">Privacy Policy</a>
            <a href="https://makemecv.org/terms-of-service" className="footer-link">Terms of Service</a>
            <a href="mailto:support@makemecv.org" className="footer-link">Support</a>
          </div>
        </div>
        <div className="footer-bottom">
          <Text>MakeMeCV ©{new Date().getFullYear()} All rights reserved</Text>
        </div>
      </Footer>
    </div>
    </>
  );
}
