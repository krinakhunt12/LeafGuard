import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        howItWorks: 'How it Works',
        technology: 'Technology',
        analyze: 'Analyze Leaf',
        dashboard: 'Dashboard',
        login: 'Login',
        signup: 'Sign Up',
        logout: 'Logout'
      },
      hero: {
        title: 'Precision Agriculture with',
        subtitle: 'Upload a leaf image and get an instant AI-powered diagnosis for plant diseases with professional treatment advice.',
        cta: 'Analyze Now'
      },
      dashboard: {
        title: 'Farmer Dashboard',
        totalScans: 'Total Scans',
        healthyCases: 'Healthy Cases',
        diseasesDetected: 'Diseases Detected',
        history: 'Diagnosis History'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: 'मुख्य पृष्ठ',
        howItWorks: 'यह कैसे काम करता है',
        technology: 'तकनीकी',
        analyze: 'पत्ते का विश्लेषण',
        dashboard: 'डैशबोर्ड',
        login: 'लॉगिन',
        signup: 'साइन अप',
        logout: 'लॉगआउट'
      },
      hero: {
        title: 'सटीक कृषि के साथ',
        subtitle: 'पत्ते की छवि अपलोड करें और पेशेवर उपचार सलाह के साथ पौधों की बीमारियों के लिए त्वरित एआई-संचालित निदान प्राप्त करें।',
        cta: 'अभी विश्लेषण करें'
      },
      dashboard: {
        title: 'किसान डैशबोर्ड',
        totalScans: 'कुल स्कैन',
        healthyCases: 'स्वस्थ मामले',
        diseasesDetected: 'रोगों का पता चला',
        history: 'निदान इतिहास'
      }
    }
  },
  gu: {
    translation: {
      nav: {
        home: 'હોમ',
        howItWorks: 'તે કેવી રીતે કામ કરે છે',
        technology: 'ટેકનોલોજી',
        analyze: 'પાંદડાનું વિશ્લેષણ',
        dashboard: 'ડેશબોર્ડ',
        login: 'લોગિન',
        signup: 'સાઇન અપ',
        logout: 'લોગઆઉટ'
      },
      hero: {
        title: 'ચોકસાઇ ખેતી સાથે',
        subtitle: 'પાંદડાની છબી અપલોડ કરો અને વ્યાવસાયિક સારવાર સલાહ સાથે છોડના રોગો માટે ત્વરિત AI-સંચાલિત નિદાન મેળવો.',
        cta: 'હમણાં વિશ્લેષણ કરો'
      },
      dashboard: {
        title: 'ખેડૂત ડેશબોર્ડ',
        totalScans: 'કુલ સ્કેન',
        healthyCases: 'તંદુરસ્ત કેસો',
        diseasesDetected: 'રોગો શોધી કાઢ્યા',
        history: 'નિદાન ઇતિહાસ'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
