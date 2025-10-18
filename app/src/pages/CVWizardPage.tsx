import React, { useState, useEffect } from "react";
import {
  Layout,
  Steps,
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Upload,
  message,
  Modal,
} from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  RiseOutlined,
  FunctionOutlined,
  SkinOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { generateCVPDF, formatDateForDisplay, CVData } from "../utils/pdfGenerator";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface WizardFormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  photo: string; // Base64 encoded photo

  // Experience
  experiences: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;

  // Education
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }>;

  // Skills
  skills: Array<string>;

  // Additional Information
  languages: Array<string>;
  certifications: Array<string>;
  interests: string;
}

const CVWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<WizardFormData>>({});
  const [isStepValid, setIsStepValid] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const steps = [
    {
      title: "Personal Info",
      icon: <UserOutlined />,
      description: "Basic information about yourself",
    },
    {
      title: "Experience",
      icon: <RiseOutlined />,
      description: "Your work experience and achievements",
    },
    {
      title: "Education",
      icon: <FunctionOutlined />,
      description: "Educational background and qualifications",
    },
    {
      title: "Skills",
      icon: <SkinOutlined />,
      description: "Technical and soft skills",
    },
    {
      title: "Review",
      icon: <FileTextOutlined />,
      description: "Review and generate your CV",
    },
  ];

  // Validation functions for each step
  const validatePersonalInfo = (values: any) => {
    return !!(values.fullName && values.email && values.phone && values.location && values.summary);
  };

  const validateExperience = (values: any) => {
    if (!values.experiences || values.experiences.length === 0) return false;
    // Filter out empty/undefined entries and check if any valid entries exist
    const validExperiences = values.experiences.filter((exp: any) => 
      exp && (exp.company || exp.position || exp.startDate || exp.description)
    );
    if (validExperiences.length === 0) return false;
    
    return validExperiences.every((exp: any) => 
      exp.company && exp.position && exp.startDate && exp.description
    );
  };

  const validateEducation = (values: any) => {
    if (!values.education || values.education.length === 0) return false;
    // Filter out empty/undefined entries and check if any valid entries exist
    const validEducation = values.education.filter((edu: any) => 
      edu && (edu.institution || edu.degree || edu.field || edu.startDate || edu.endDate)
    );
    if (validEducation.length === 0) return false;
    
    return validEducation.every((edu: any) => 
      edu.institution && edu.degree && edu.field && edu.startDate && edu.endDate
    );
  };

  const validateSkills = (values: any) => {
    return !!(values.skills && values.skills.length > 0);
  };

  const validateCurrentStep = (values: any) => {
    let result = false;
    switch (currentStep) {
      case 0:
        result = validatePersonalInfo(values);
        break;
      case 1:
        result = validateExperience(values);
        break;
      case 2:
        result = validateEducation(values);
        break;
      case 3:
        result = validateSkills(values);
        break;
      case 4:
        // For review step, validate all previous steps
        const personalValid = validatePersonalInfo(values);
        const experienceValid = validateExperience(values);
        const educationValid = validateEducation(values);
        const skillsValid = validateSkills(values);
        result = personalValid && experienceValid && educationValid && skillsValid;
        break;
      default:
        result = false;
    }
    return result;
  };

  // Check form validation on field changes
  const onFieldsChange = () => {
    const values = form.getFieldsValue();
    const allValues = { ...formData, ...values };
    const isValid = validateCurrentStep(allValues);
    setIsStepValid(isValid);
  };

  // Initialize validation state when component mounts
  useEffect(() => {
    const values = form.getFieldsValue();
    const allValues = { ...formData, ...values };
    const isValid = validateCurrentStep(allValues);
    setIsStepValid(isValid);
  }, [currentStep, formData]);

  // Special effect for review step to ensure validation is updated
  useEffect(() => {
    if (currentStep === 4) {
      const values = form.getFieldsValue();
      const allValues = { ...formData, ...values };
      const personalValid = validatePersonalInfo(allValues);
      const experienceValid = validateExperience(allValues);
      const educationValid = validateEducation(allValues);
      const skillsValid = validateSkills(allValues);
      const isValid = personalValid && experienceValid && educationValid && skillsValid;
      setIsStepValid(isValid);
    }
  }, [currentStep, formData]);

  const handleNext = () => {
    if (!isStepValid) return;
    
    form.validateFields().then(() => {
      const values = form.getFieldsValue();
      const newFormData = { ...formData, ...values };
      setFormData(newFormData);
      setCurrentStep(currentStep + 1);
      
      // Re-validate the next step with updated form data
      setTimeout(() => {
        const nextStepValues = form.getFieldsValue();
        const allValues = { ...newFormData, ...nextStepValues };
        const nextStepValid = validateCurrentStep(allValues);
        setIsStepValid(nextStepValid);
      }, 100);
    }).catch(() => {
      setIsStepValid(false);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    // Re-validate the previous step
    setTimeout(() => {
      const prevStepValues = form.getFieldsValue();
      const allValues = { ...formData, ...prevStepValues };
      const prevStepValid = validateCurrentStep(allValues);
      setIsStepValid(prevStepValid);
    }, 100);
  };

  const handleFinish = () => {
    if (!isStepValid) return;
    
    form.validateFields().then((values) => {
      const finalData = { ...formData, ...values };
      setFormData(finalData);
      setShowDonationModal(true);
    }).catch(() => {
      setIsStepValid(false);
    });
  };

  const handleGenerateCV = async () => {
    setShowDonationModal(false);
    setIsGeneratingPDF(true);
    
    try {
      // Prepare the CV data
      const cvData: CVData = {
        fullName: formData.fullName || '',
        email: formData.email || '',
        phone: formData.phone || '',
        location: formData.location || '',
        linkedin: formData.linkedin,
        website: formData.website,
        summary: formData.summary || '',
        photo: formData.photo,
        experiences: (formData.experiences || []).map(exp => ({
          company: exp.company || '',
          position: exp.position || '',
          startDate: formatDateForDisplay(exp.startDate),
          endDate: formatDateForDisplay(exp.endDate),
          current: exp.current || false,
          description: exp.description || '',
        })),
        education: (formData.education || []).map(edu => ({
          institution: edu.institution || '',
          degree: edu.degree || '',
          field: edu.field || '',
          startDate: formatDateForDisplay(edu.startDate),
          endDate: formatDateForDisplay(edu.endDate),
          gpa: edu.gpa,
        })),
        skills: formData.skills || [],
        languages: formData.languages || [],
        certifications: formData.certifications || [],
        interests: formData.interests,
      };

      // Generate and download the PDF
      await generateCVPDF(cvData);
      
      message.success("CV generated and downloaded successfully! 🎉");
      
      // Optional: Reset the form or redirect
      // navigate("/");
      
    } catch (error) {
      console.error('Error generating CV:', error);
      message.error("Failed to generate CV. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleCancelDonation = () => {
    setShowDonationModal(false);
    message.info("CV generation cancelled");
  };

  const renderPersonalInfo = () => (
    <div className="wizard-step-content">
      <Title level={3} className="step-title">
        Tell us about yourself
      </Title>
      <Paragraph className="step-description">
        Let's start with your basic information. This will appear at the top of your CV.
      </Paragraph>

      {/* Photo Upload Section */}
      <Row gutter={[24, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24}>
          <Form.Item name="photo" label="Profile Photo">
            <Upload
              accept="image/*"
              listType="picture-card"
              maxCount={1}
              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const result = e.target?.result as string;
                  // Update form data with base64 image
                  form.setFieldsValue({ photo: result });
                };
                reader.readAsDataURL(file);
                return false; // Prevent upload
              }}
              onRemove={() => {
                form.setFieldsValue({ photo: '' });
              }}
            >
              {formData.photo ? null : (
                <div>
                  <UserOutlined style={{ fontSize: 24, color: '#667eea' }} />
                  <div style={{ marginTop: 8, color: '#667eea' }}>
                    Upload Photo
                  </div>
                </div>
              )}
            </Upload>
            {formData.photo && (
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <img
                  src={formData.photo}
                  alt="Profile"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: '50%',
                    border: '2px solid #667eea'
                  }}
                />
                <div style={{ marginTop: 4, fontSize: 12, color: '#666' }}>
                  Profile photo preview
                </div>
              </div>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[24, 16]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input size="large" placeholder="John Doe" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input size="large" placeholder="john@example.com" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter your phone number" }]}
          >
            <Input size="large" placeholder="+1 (555) 123-4567" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter your location" }]}
          >
            <Input size="large" placeholder="New York, NY" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="linkedin" label="LinkedIn Profile">
            <Input size="large" placeholder="https://linkedin.com/in/johndoe" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="website" label="Personal Website">
            <Input size="large" placeholder="https://johndoe.com" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="summary"
            label="Professional Summary"
            rules={[{ required: true, message: "Please enter a professional summary" }]}
          >
            <TextArea
              rows={4}
              size="large"
              placeholder="Brief summary of your professional background, key skills, and career objectives..."
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );

  const renderExperience = () => (
    <div className="wizard-step-content">
      <Title level={3} className="step-title">
        Your Work Experience
      </Title>
      <Paragraph className="step-description">
        Add your work experience, starting with the most recent position.
      </Paragraph>

      <Form.List name="experiences" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card key={key} className="experience-card" style={{ marginBottom: 16 }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "company"]}
                      label="Company"
                      rules={[{ required: true, message: "Please enter company name" }]}
                    >
                      <Input size="large" placeholder="Acme Corporation" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "position"]}
                      label="Position"
                      rules={[{ required: true, message: "Please enter your position" }]}
                    >
                      <Input size="large" placeholder="Software Engineer" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "startDate"]}
                      label="Start Date"
                      rules={[{ required: true, message: "Please select start date" }]}
                    >
                      <DatePicker size="large" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "endDate"]}
                      label="End Date"
                    >
                      <DatePicker size="large" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, "current"]}
                      label="Current Position"
                      valuePropName="checked"
                    >
                      <Select size="large" placeholder="Select">
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      label="Job Description"
                      rules={[{ required: true, message: "Please enter job description" }]}
                    >
                      <TextArea
                        rows={3}
                        size="large"
                        placeholder="Describe your key responsibilities, achievements, and impact in this role..."
                      />
                    </Form.Item>
                  </Col>
                  {fields.length > 1 && (
                    <Col xs={24}>
                      <Button
                        type="text"
                        danger
                        onClick={() => remove(name)}
                        style={{ marginTop: 8 }}
                      >
                        Remove Experience
                      </Button>
                    </Col>
                  )}
                </Row>
              </Card>
            ))}
            <Button
              type="dashed"
              onClick={() => add()}
              block
              size="large"
              style={{ marginTop: 16 }}
            >
              Add Another Experience
            </Button>
          </>
        )}
      </Form.List>
    </div>
  );

  const renderEducation = () => (
    <div className="wizard-step-content">
      <Title level={3} className="step-title">
        Your Education
      </Title>
      <Paragraph className="step-description">
        Add your educational background and qualifications.
      </Paragraph>

      <Form.List name="education" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Card key={key} className="education-card" style={{ marginBottom: 16 }}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "institution"]}
                      label="Institution"
                      rules={[{ required: true, message: "Please enter institution name" }]}
                    >
                      <Input size="large" placeholder="University of Technology" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "degree"]}
                      label="Degree"
                      rules={[{ required: true, message: "Please enter degree" }]}
                    >
                      <Select size="large" placeholder="Select degree">
                        <Option value="Bachelor's">Bachelor's Degree</Option>
                        <Option value="Master's">Master's Degree</Option>
                        <Option value="PhD">PhD</Option>
                        <Option value="Associate">Associate Degree</Option>
                        <Option value="Certificate">Certificate</Option>
                        <Option value="Diploma">Diploma</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "field"]}
                      label="Field of Study"
                      rules={[{ required: true, message: "Please enter field of study" }]}
                    >
                      <Input size="large" placeholder="Computer Science" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "gpa"]}
                      label="GPA (Optional)"
                    >
                      <Input size="large" placeholder="3.8" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "startDate"]}
                      label="Start Date"
                      rules={[{ required: true, message: "Please select start date" }]}
                    >
                      <DatePicker size="large" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      {...restField}
                      name={[name, "endDate"]}
                      label="End Date"
                      rules={[{ required: true, message: "Please select end date" }]}
                    >
                      <DatePicker size="large" style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  {fields.length > 1 && (
                    <Col xs={24}>
                      <Button
                        type="text"
                        danger
                        onClick={() => remove(name)}
                        style={{ marginTop: 8 }}
                      >
                        Remove Education
                      </Button>
                    </Col>
                  )}
                </Row>
              </Card>
            ))}
            <Button
              type="dashed"
              onClick={() => add()}
              block
              size="large"
              style={{ marginTop: 16 }}
            >
              Add Another Education
            </Button>
          </>
        )}
      </Form.List>
    </div>
  );

  const renderSkills = () => (
    <div className="wizard-step-content">
      <Title level={3} className="step-title">
        Your Skills & Expertise
      </Title>
      <Paragraph className="step-description">
        Add your technical skills, soft skills, languages, and certifications.
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="skills"
            label="Technical Skills"
            rules={[{ required: true, message: "Please add at least one skill" }]}
          >
            <Select
              mode="tags"
              size="large"
              placeholder="Add skills (e.g., JavaScript, Python, React)"
              style={{ width: "100%" }}
            >
              <Option value="JavaScript">JavaScript</Option>
              <Option value="Python">Python</Option>
              <Option value="React">React</Option>
              <Option value="Node.js">Node.js</Option>
              <Option value="Java">Java</Option>
              <Option value="SQL">SQL</Option>
              <Option value="AWS">AWS</Option>
              <Option value="Docker">Docker</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="languages" label="Languages">
            <Select
              mode="tags"
              size="large"
              placeholder="Add languages (e.g., English, Spanish)"
              style={{ width: "100%" }}
            >
              <Option value="English">English</Option>
              <Option value="Spanish">Spanish</Option>
              <Option value="French">French</Option>
              <Option value="German">German</Option>
              <Option value="Chinese">Chinese</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="certifications" label="Certifications">
            <Select
              mode="tags"
              size="large"
              placeholder="Add certifications (e.g., AWS Certified)"
              style={{ width: "100%" }}
            >
              <Option value="AWS Certified">AWS Certified</Option>
              <Option value="Google Cloud">Google Cloud</Option>
              <Option value="Microsoft Azure">Microsoft Azure</Option>
              <Option value="PMP">PMP</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="interests" label="Interests & Hobbies">
            <TextArea
              rows={3}
              size="large"
              placeholder="Share your interests and hobbies (optional)"
            />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );

  const formatDate = (date: any) => {
    if (!date) return "Not specified";
    if (typeof date === 'string') return date;
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      });
    }
    if (date && date.format) {
      return date.format('MMMM YYYY');
    }
    return "Not specified";
  };

  const renderReview = () => (
    <div className="wizard-step-content">
      <Title level={3} className="step-title">
        Review Your Information
      </Title>
      <Paragraph className="step-description">
        Please review all your information before generating your CV.
      </Paragraph>

      <Card className="review-card">
        <Title level={4}>Personal Information</Title>
        {formData.photo && (
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <img
              src={formData.photo}
              alt="Profile"
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid #667eea'
              }}
            />
            <div style={{ marginTop: 4, fontSize: 12, color: '#666' }}>
              Profile Photo
            </div>
          </div>
        )}
        <Paragraph>
          <Text strong>Name:</Text> {formData.fullName || "Not provided"}
        </Paragraph>
        <Paragraph>
          <Text strong>Email:</Text> {formData.email || "Not provided"}
        </Paragraph>
        <Paragraph>
          <Text strong>Phone:</Text> {formData.phone || "Not provided"}
        </Paragraph>
        <Paragraph>
          <Text strong>Location:</Text> {formData.location || "Not provided"}
        </Paragraph>
        {formData.linkedin && (
          <Paragraph>
            <Text strong>LinkedIn:</Text> {formData.linkedin}
          </Paragraph>
        )}
        {formData.website && (
          <Paragraph>
            <Text strong>Website:</Text> {formData.website}
          </Paragraph>
        )}

        <Divider />

        <Title level={4}>Summary</Title>
        <Paragraph>{formData.summary || "No summary provided"}</Paragraph>

        <Divider />

        <Title level={4}>Experience</Title>
        {formData.experiences?.length ? (
          formData.experiences.map((exp, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <Text strong>{exp.position} at {exp.company}</Text>
              <br />
              <Text type="secondary">
                {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
              </Text>
              <br />
              <Text>{exp.description}</Text>
            </div>
          ))
        ) : (
          <Text type="secondary">No experience added</Text>
        )}

        <Divider />

        <Title level={4}>Education</Title>
        {formData.education?.length ? (
          formData.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <Text strong>{edu.degree} in {edu.field}</Text>
              <br />
              <Text type="secondary">{edu.institution}</Text>
              <br />
              <Text type="secondary">
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
              </Text>
              {edu.gpa && <><br /><Text type="secondary">GPA: {edu.gpa}</Text></>}
            </div>
          ))
        ) : (
          <Text type="secondary">No education added</Text>
        )}

        <Divider />

        <Title level={4}>Skills</Title>
        <div style={{ marginBottom: 16 }}>
          <Text strong>Technical Skills:</Text> {formData.skills?.join(", ") || "None added"}
        </div>
        <div style={{ marginBottom: 16 }}>
          <Text strong>Languages:</Text> {formData.languages?.join(", ") || "None added"}
        </div>
        <div style={{ marginBottom: 16 }}>
          <Text strong>Certifications:</Text> {formData.certifications?.join(", ") || "None added"}
        </div>
        {formData.interests && (
          <div>
            <Text strong>Interests:</Text> {formData.interests}
          </div>
        )}
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderExperience();
      case 2:
        return renderEducation();
      case 3:
        return renderSkills();
      case 4:
        return renderReview();
      default:
        return null;
    }
  };

  return (
    <>
      {/* Donation Modal */}
      <Modal
        open={showDonationModal}
        onCancel={handleCancelDonation}
        footer={null}
        width={700}
        className="donation-modal"
        centered
      >
        <div className="donation-modal-content">
          <div className="donation-header">
            <div className="donation-icon">🤝</div>
            <Title level={3} className="donation-title">
              Almost there! 🎯
            </Title>
            <Paragraph className="donation-subtitle">
              Before generating your professional CV, would you consider supporting our work?
            </Paragraph>
          </div>

          <div className="donation-message">
            <div className="message-bubble">
              <div className="message-icon">💝</div>
              <div className="message-text">
                <Text strong>Hey there! 👋</Text>
                <br />
                <Text>
                  I've helped you create an amazing CV! If this tool was helpful, 
                  a small donation would mean the world to me and help keep this service free for everyone.
                </Text>
              </div>
            </div>
          </div>

          <div className="donation-options">
            <div className="qr-code-section">
              <div className="qr-code-placeholder">
                <img 
                  src="/qr-code.png" 
                  alt="QR Code for donations"
                  className="qr-code-image"
                />
              </div>
            </div>
            
            <div className="donation-note">
              <Text type="secondary">
                💡 Your support helps us maintain and improve this free CV builder for everyone!
              </Text>
              <Text type="secondary">
                💡 We can create more templates so your CV looks even better!
              </Text>
            </div>
          </div>

          <div className="donation-actions">
            <Button
              size="large"
              onClick={handleCancelDonation}
              className="donation-cancel-btn"
            >
              Maybe Later 😊
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleGenerateCV}
              loading={isGeneratingPDF}
              disabled={isGeneratingPDF}
              className="donation-generate-btn"
            >
              {isGeneratingPDF ? 'Generating CV...' : 'Generate CV Now 🚀'}
            </Button>
          </div>
        </div>
      </Modal>

      <div className="wizard-page">
      <Header className="wizard-header">
        <div className="wizard-logo">
          <FileTextOutlined className="logo-icon" />
          <span className="logo-text">CVCraft</span>
        </div>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
          className="back-button"
        >
          Back to Home
        </Button>
      </Header>

      <Content className="wizard-content">
        <div className="wizard-container">
          <div className="wizard-progress">
            <Title level={2} className="wizard-title">
              Create Your Professional CV
            </Title>
            <Paragraph className="wizard-subtitle">
              Follow these simple steps to generate a professional CV that stands out
            </Paragraph>
            <Steps
              current={currentStep}
              items={steps}
              className="wizard-steps"
            />
          </div>

          <div className="wizard-form-container">
            <Card className="wizard-form-card">
              <Form
                form={form}
                layout="vertical"
                size="large"
                initialValues={formData}
                onFieldsChange={onFieldsChange}
              >
                {renderStepContent()}
              </Form>
            </Card>

            <div className="wizard-navigation">
              <Space size="large">
                {currentStep > 0 && (
                  <Button
                    size="large"
                    onClick={handlePrev}
                    icon={<ArrowLeftOutlined />}
                    className="nav-button"
                  >
                    Previous
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleNext}
                    disabled={!isStepValid}
                    icon={<ArrowRightOutlined />}
                    className="nav-button primary"
                  >
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleFinish}
                    icon={<CheckOutlined />}
                    className="nav-button primary"
                  >
                    Generate CV
                  </Button>
                )}
              </Space>
            </div>
          </div>
        </div>
      </Content>

      <Footer className="wizard-footer">
        <Text>CVCraft ©{new Date().getFullYear()} | Professional CVs made simple</Text>
      </Footer>
      </div>
    </>
  );
};

export default CVWizardPage;
