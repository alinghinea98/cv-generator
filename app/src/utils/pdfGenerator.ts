import { pdf } from '@react-pdf/renderer';
import { createCVDocument } from '../components/CVTemplate';

export interface CVData {
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
}

export const generateCVPDF = async (data: CVData): Promise<void> => {
  try {
    // Create the PDF document
    const doc = createCVDocument(data);
    
    // Generate the PDF blob
    const blob = await pdf(doc).toBlob();
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.fullName.replace(/\s+/g, '_')}_CV.pdf`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate CV PDF');
  }
};

// Helper function to format dates for display
export const formatDateForDisplay = (date: any): string => {
  if (!date) return '';
  
  if (typeof date === 'string') return date;
  
  if (date instanceof Date) {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }
  
  if (date && date.format) {
    return date.format('MMM YYYY');
  }
  
  return date.toString();
};
