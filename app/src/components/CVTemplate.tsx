import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

// Using built-in fonts that React-PDF supports by default
// No need to register fonts - React-PDF comes with Helvetica, Times-Roman, and Courier

// Define modern, professional styles inspired by the example
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
  },
  // Right sidebar (35% width) - Gold/Brown background
  rightColumn: {
    width: '35%',
    backgroundColor: '#B8860B', // Gold/Brown color from the example
    padding: 25,
    color: '#FFFFFF',
  },
  // Left main content (65% width)
  leftColumn: {
    width: '65%',
    padding: 30,
    backgroundColor: '#FFFFFF',
  },
  
  // Main content header (left column)
  mainHeader: {
    marginBottom: 30,
  },
  mainName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  mainTitle: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'normal',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  headerDivider: {
    height: 2,
    backgroundColor: '#B8860B',
    marginTop: 20
  },

  // Profile section (right sidebar)
  profileSection: {
    marginBottom: 25,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    objectFit: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 1.2,
    textAlign: 'center',
  },
  title: {
    fontSize: 10,
    color: '#F5F5F5',
    fontWeight: 'normal',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#F5F5F5',
    marginBottom: 20,
  },
  
  // Contact section
  contactSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactItem: {
    fontSize: 9,
    color: '#F5F5F5',
    marginBottom: 6,
    lineHeight: 1.3,
  },
  
  // Skills section
  skillsSection: {
    marginBottom: 25,
  },
  skillCategory: {
    marginBottom: 15,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#94a3b8',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  skillTag: {
    backgroundColor: '#334155',
    color: '#e2e8f0',
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 4,
    fontSize: 8,
    borderRadius: 2,
  },
  languageTag: {
    backgroundColor: '#0f172a',
    color: '#cbd5e1',
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 4,
    fontSize: 8,
    borderRadius: 2,
  },
  certificationTag: {
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginRight: 4,
    marginBottom: 4,
    fontSize: 8,
    borderRadius: 2,
  },
  
  // Left column main content styles
  leftSection: {
    marginBottom: 25,
  },
  leftSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#B8860B',
    paddingBottom: 5,
  },
  
  // Experience styles
  experienceItem: {
    marginBottom: 20,
    paddingBottom: 15,
  },
  experienceHeader: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  company: {
    fontSize: 10,
    color: '#B8860B',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  dateRange: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
    marginTop: 6,
  },
  
  // Education styles
  educationItem: {
    marginBottom: 15,
    paddingBottom: 12,
  },
  degree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 3,
  },
  institution: {
    fontSize: 10,
    color: '#B8860B',
    fontWeight: 'bold',
    marginBottom: 3,
  },
  educationDate: {
    fontSize: 9,
    color: '#666666',
    fontStyle: 'italic',
  },
  
  // Interests section
  interests: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#475569',
  },
  
  // Container styles
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

interface CVTemplateProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
    summary: string;
    photo?: string; // Base64 encoded photo
    experiences: Array<{
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
    }>;
    education: Array<{
      institution: string;
      degree: string;
      field: string;
      startDate: string;
      endDate: string;
      gpa?: string;
    }>;
    skills: string[];
    languages: string[];
    certifications: string[];
    interests?: string;
  };
}

const CVTemplate: React.FC<CVTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Main Content */}
      <View style={styles.leftColumn}>
        {/* Main Header */}
        <View style={styles.mainHeader}>
          <Text style={styles.mainName}>{data.fullName}</Text>
          <View style={styles.headerDivider} />
        </View>

        {/* Profile Section */}
        <View style={styles.leftSection}>
          <Text style={styles.leftSectionTitle}>Profile</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>

        {/* Experience Section */}
        {data.experiences.length > 0 && (
          <View style={styles.leftSection}>
            <Text style={styles.leftSectionTitle}>Experience</Text>
            {data.experiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.dateRange}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </Text>
                </View>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <View style={styles.leftSection}>
            <Text style={styles.leftSectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree} in {edu.field}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.educationDate}>
                  {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Right Sidebar */}
      <View style={styles.rightColumn}>
        {/* Profile Photo */}
        {data.photo && (
          <View style={styles.photoContainer}>
            <Image style={styles.photo} src={data.photo} />
          </View>
        )}

        {/* Education Section (in sidebar) */}
        {data.education.length > 0 && (
          <View style={styles.contactSection}>
            <Text style={styles.sectionHeader}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.educationDate}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionHeader}>Contact</Text>
          <Text style={styles.contactItem}>{data.email}</Text>
          <Text style={styles.contactItem}>{data.phone}</Text>
          <Text style={styles.contactItem}>{data.location}</Text>
          {data.linkedin && (
            <Text style={styles.contactItem}>LinkedIn: {data.linkedin}</Text>
          )}
          {data.website && (
            <Text style={styles.contactItem}>Website: {data.website}</Text>
          )}
        </View>

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionHeader}>Skills</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages Section */}
        {data.languages.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionHeader}>Languages</Text>
            <View style={styles.languagesContainer}>
              {data.languages.map((language, index) => (
                <Text key={index} style={styles.languageTag}>{language}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionHeader}>Certifications</Text>
            <View style={styles.certificationsContainer}>
              {data.certifications.map((cert, index) => (
                <Text key={index} style={styles.certificationTag}>{cert}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Interests Section */}
        {data.interests && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionHeader}>Interests</Text>
            <Text style={styles.interests}>{data.interests}</Text>
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default CVTemplate;

// Export a function that creates the Document for PDF generation
export const createCVDocument = (data: CVTemplateProps['data']) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Main Content */}
      <View style={styles.leftColumn}>
        {/* Main Header */}
        <View style={styles.mainHeader}>
          <Text style={styles.mainName}>{data.fullName}</Text>
          <View style={styles.headerDivider} />
        </View>

        {/* Profile Section */}
        <View style={styles.leftSection}>
          <Text style={styles.leftSectionTitle}>Profile</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>

        {/* Experience Section */}
        {data.experiences.length > 0 && (
          <View style={styles.leftSection}>
            <Text style={styles.leftSectionTitle}>Experience</Text>
            {data.experiences.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                  <Text style={styles.dateRange}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </Text>
                </View>
                <Text style={styles.description}>{exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <View style={styles.leftSection}>
            <Text style={styles.leftSectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree} in {edu.field}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.educationDate}>
                  {edu.startDate} - {edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Right Sidebar */}
      <View style={styles.rightColumn}>
        {/* Profile Photo */}
        {data.photo && (
          <View style={styles.photoContainer}>
            <Image style={styles.photo} src={data.photo} />
          </View>
        )}

        {/* Education Section (in sidebar) */}
        {data.education.length > 0 && (
          <View style={styles.contactSection}>
            <Text style={styles.sectionHeader}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
                <Text style={styles.degree}>{edu.degree}</Text>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.educationDate}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Contact Section */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionHeader}>Contact</Text>
          <Text style={styles.contactItem}>{data.email}</Text>
          <Text style={styles.contactItem}>{data.phone}</Text>
          <Text style={styles.contactItem}>{data.location}</Text>
          {data.linkedin && (
            <Text style={styles.contactItem}>LinkedIn: {data.linkedin}</Text>
          )}
          {data.website && (
            <Text style={styles.contactItem}>Website: {data.website}</Text>
          )}
        </View>

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionHeader}>Skills</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skillTag}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Languages Section */}
        {data.languages.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionHeader}>Languages</Text>
            <View style={styles.languagesContainer}>
              {data.languages.map((language, index) => (
                <Text key={index} style={styles.languageTag}>{language}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionHeader}>Certifications</Text>
            <View style={styles.certificationsContainer}>
              {data.certifications.map((cert, index) => (
                <Text key={index} style={styles.certificationTag}>{cert}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Interests Section */}
        {data.interests && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionHeader}>Interests</Text>
            <Text style={styles.interests}>{data.interests}</Text>
          </View>
        )}
      </View>
    </Page>
  </Document>
);