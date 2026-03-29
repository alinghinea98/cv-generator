import React, { useEffect, useMemo, useState } from "react";
import { Layout, Row, Col, Typography, Button, Card, Space, Modal, Spin, Alert } from "antd";
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
import { pdf } from "@react-pdf/renderer";
import { createCVDocument } from "../components/CVTemplate";

const { Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

export default function LandingPage() {
  const navigate = useNavigate();
  const [isExamplesOpen, setIsExamplesOpen] = useState(false);
  const [isExamplesLoading, setIsExamplesLoading] = useState(false);
  const [examplesError, setExamplesError] = useState<string | null>(null);
  const [examplePdfUrl, setExamplePdfUrl] = useState<string | null>(null);
  const [examplePhotoDataUrl, setExamplePhotoDataUrl] = useState<string | null>(null);

  const exampleData = useMemo(
    () => ({
      fullName: "Alex Morgan",
      email: "alex.morgan@email.com",
      phone: "+1 (555) 012-3456",
      location: "London, UK",
      linkedin: "linkedin.com/in/alexmorgan",
      website: "alexmorgan.dev",
      summary:
        "Product manager with 6+ years of experience shipping customer‑focused features and improving conversion funnels. Strong stakeholder management, experimentation, and roadmap execution across cross‑functional teams.",
      photo: undefined,
      experiences: [
        {
          company: "NovaPay",
          position: "Product Manager",
          startDate: "2022",
          endDate: "",
          current: true,
          description:
            "Led checkout improvements that increased completed purchases by 12% through A/B testing. Shipped a new onboarding flow reducing time‑to‑first‑transaction by 28%. Partnered with design/engineering to deliver roadmap milestones on time for 3 consecutive quarters.",
        },
        {
          company: "BrightApps",
          position: "Associate PM",
          startDate: "2019",
          endDate: "2022",
          current: false,
          description:
            "Improved retention by 9% by launching lifecycle messaging and improving feature discovery. Defined PRDs and success metrics for 15+ releases across iOS and Android.",
        },
      ],
      education: [
        {
          institution: "University of Manchester",
          degree: "BSc",
          field: "Business & Information Systems",
          startDate: "2015",
          endDate: "2019",
          gpa: "",
        },
      ],
      skills: ["Roadmapping", "Analytics", "Experimentation", "SQL", "Figma", "Stakeholder management"],
      languages: ["English"],
      certifications: ["PSPO I"],
      interests: "Running, travel, and volunteering at local tech meetups.",
    }),
    []
  );

  useEffect(() => {
    return () => {
      if (examplePdfUrl) URL.revokeObjectURL(examplePdfUrl);
    };
  }, [examplePdfUrl]);

  const getPhotoDataUrl = async () => {
    if (examplePhotoDataUrl) return examplePhotoDataUrl;
    const res = await fetch("/1-intro-photo-final.jpg", { cache: "force-cache" });
    if (!res.ok) throw new Error("Photo fetch failed");
    const blob = await res.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Photo read failed"));
      reader.readAsDataURL(blob);
    });
    setExamplePhotoDataUrl(dataUrl);
    return dataUrl;
  };

  const openExamples = async () => {
    setIsExamplesOpen(true);
    setExamplesError(null);

    if (examplePdfUrl) return;

    setIsExamplesLoading(true);
    try {
      const photo = await getPhotoDataUrl();
      const doc = createCVDocument({ ...exampleData, photo });
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      setExamplePdfUrl(url);
    } catch (e) {
      setExamplesError("Could not load the example preview. Please try again.");
    } finally {
      setIsExamplesLoading(false);
    }
  };

  const closeExamples = () => {
    setIsExamplesOpen(false);
  };

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
                  <Button
                    size="large"
                    className="secondary-btn"
                    onClick={openExamples}
                  >
                    View Example
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
    <Modal
      open={isExamplesOpen}
      onCancel={closeExamples}
      footer={null}
      centered
      width={920}
      className="examples-modal"
      title="Example CV (preview)"
    >
      <div className="examples-modal-body">
        {examplesError && (
          <Alert
            type="error"
            message={examplesError}
            showIcon
            style={{ marginBottom: 12 }}
          />
        )}

        <div className="cv-example-preview" aria-label="Example CV preview">
          {isExamplesLoading ? (
            <div className="cv-example-loading">
              <Spin size="large" />
              <div className="cv-example-loading-text">Loading preview…</div>
            </div>
          ) : examplePdfUrl ? (
            <iframe
              className="cv-example-iframe"
              src={examplePdfUrl}
              title="Example generated CV"
            />
          ) : (
            <div className="cv-example-loading">
              <div className="cv-example-loading-text">Preview not available.</div>
            </div>
          )}
        </div>

        <div className="examples-modal-cta">
          <Button type="primary" size="large" onClick={() => navigate("/free-cv-builder")}>
            Create your CV
          </Button>
          {examplePdfUrl && (
            <Button
              size="large"
              onClick={() => {
                const link = document.createElement("a");
                link.href = examplePdfUrl;
                link.download = "Example_CV.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download example
            </Button>
          )}
          <Button size="large" onClick={closeExamples}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
    </>
  );
}
