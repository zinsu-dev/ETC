import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Search, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Download, 
  AlertTriangle, 
  User, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  Home, 
  ShieldCheck, 
  LogOut, 
  Lock, 
  Info,
  Check,
  Bell,
  Play,
  Baby,
  Flame,
  Bug,
  Heart,
  MessageSquare,
  ArrowLeft,
  Share2,
  MoreVertical,
  Phone,
  Mail,
  Award,
  Bookmark,
  Plus,
  X,
  Copy,
  Coins,
  FileText,
  ThumbsUp
} from 'lucide-react';
import './App.css';

// Mock Bookings Data
const INITIAL_MOCK_BOOKINGS = [
  {
    id: 'BK-112233',
    testName: 'Complete Lipid Panel',
    testCode: 'LIP-09',
    hospitalName: 'Evercare Hospital',
    appointmentDate: '16 May, 2026',
    appointmentTime: '3:00 PM',
    patientName: 'Sewa Alao',
    patientPhone: '08012345678',
    collectionMethod: 'Walk-in Clinic',
    totalPaid: 18500,
    status: 'Scheduled',
    createdAt: '15/05/2026'
  },
  {
    id: 'BK-445566',
    testName: 'Thyroid Hormone Panel (T3, T4, TSH)',
    testCode: 'THY-02',
    hospitalName: 'Synlab Nigeria',
    appointmentDate: '10 May, 2026',
    appointmentTime: '10:00 AM',
    patientName: 'Sewa Alao',
    patientPhone: '08012345678',
    collectionMethod: 'Home Collection',
    totalPaid: 24000,
    status: 'Completed',
    createdAt: '09/05/2026'
  },
  {
    id: 'BK-778899',
    testName: 'Comprehensive Wellness Package',
    testCode: 'WEL-01',
    hospitalName: 'Lancet Laboratories',
    appointmentDate: '02 May, 2026',
    appointmentTime: '11:00 AM',
    patientName: 'Sewa Alao',
    patientPhone: '08012345678',
    collectionMethod: 'Walk-in Clinic',
    totalPaid: 50000,
    status: 'Cancelled',
    createdAt: '01/05/2026'
  }
];


// Mock Videos and Labs
const LABS_NEAR_YOU = [
  { name: 'Peak Diagnostic Laboratory', location: 'Lekki toll gate', distance: '2.4 km', rating: 4.7 },
  { name: 'Aves Specialty', location: 'Banana Island', distance: '2.4 km', rating: 4.7 },
  { name: 'Lagoon Hospital', location: 'Ikoyi', distance: '2.4 km', rating: 4.7 }
];

const VIDEOS = [
  {
    title: 'Understanding Lipid Profiles',
    doctor: 'Dr. Kunle Akinyemi',
    duration: '4:20',
    thumbnail: 'https://images.unsplash.com/photo-1579684389782-64d84b5e902a?auto=format&fit=crop&q=80&w=640'
  },
  {
    title: 'Signs of Hormonal Imbalance',
    doctor: 'Dr. Amina Bello',
    duration: '5:15',
    thumbnail: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=640'
  },
  {
    title: 'Malaria Prevention Tips',
    doctor: 'Dr. Tunde Alao',
    duration: '3:45',
    thumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=640'
  }
];

const CATEGORIES_WITH_ICONS = [
  { id: 'all', name: 'General health', icon: <Activity size={20} color="#3b82f6" /> },
  { id: 'antenatal', name: 'Ante-natal', icon: <Baby size={20} color="#ec4899" /> },
  { id: 'cardiac', name: 'Heart & blood', icon: <Heart size={20} color="#ef4444" /> },
  { id: 'hormones', name: 'Hormones', icon: <Flame size={20} color="#f59e0b" /> },
  { id: 'infectious', name: 'Infections', icon: <Bug size={20} color="#10b981" /> }
];

// Mock Catalog Data
const LAB_TESTS = [
  {
    id: 'lipid',
    name: 'Complete Lipid Panel',
    code: 'LIP-09',
    category: 'cardiac',
    description: 'Measures cholesterol levels (HDL, LDL, Triglycerides) to evaluate cardiovascular risk.',
    hospitals: [
      { id: 'synlab', name: 'Synlab Nigeria', rating: 4.8, price: 18500, tat: '1 Day' },
      { id: 'lancet', name: 'Lancet Laboratories', rating: 4.7, price: 22000, tat: '1 Day' },
      { id: 'medbury', name: 'Medbury Diagnostics', rating: 4.4, price: 15000, tat: '2 Days' },
      { id: 'evercare', name: 'Evercare Hospital', rating: 4.9, price: 25000, tat: '6 Hours' },
    ]
  },
  {
    id: 'wellness',
    name: 'Comprehensive Wellness Package',
    code: 'WEL-01',
    category: 'wellness',
    description: 'A complete screen checking Full Blood Count, Liver, Kidney functions, and general nutrition.',
    hospitals: [
      { id: 'synlab', name: 'Synlab Nigeria', rating: 4.8, price: 45000, tat: '2 Days' },
      { id: 'lancet', name: 'Lancet Laboratories', rating: 4.7, price: 50000, tat: '2 Days' },
      { id: 'medbury', name: 'Medbury Diagnostics', rating: 4.4, price: 38000, tat: '3 Days' },
      { id: 'evercare', name: 'Evercare Hospital', rating: 4.9, price: 60000, tat: '1 Day' },
    ]
  },
  {
    id: 'thyroid',
    name: 'Thyroid Hormone Panel (T3, T4, TSH)',
    code: 'THY-02',
    category: 'hormones',
    description: 'Evaluates thyroid gland activity, helpful in checking metabolism speed and hormonal imbalances.',
    hospitals: [
      { id: 'synlab', name: 'Synlab Nigeria', rating: 4.8, price: 24000, tat: '1 Day' },
      { id: 'lancet', name: 'Lancet Laboratories', rating: 4.7, price: 28000, tat: '2 Days' },
      { id: 'medbury', name: 'Medbury Diagnostics', rating: 4.4, price: 20000, tat: '2 Days' },
      { id: 'evercare', name: 'Evercare Hospital', rating: 4.9, price: 30000, tat: '1 Day' },
    ]
  },
  {
    id: 'hba1c',
    name: 'HbA1c (Glycated Haemoglobin)',
    code: 'DIA-04',
    category: 'diabetes',
    description: 'Checks average blood sugar levels over the past 3 months to monitor or screen for diabetes.',
    hospitals: [
      { id: 'synlab', name: 'Synlab Nigeria', rating: 4.8, price: 8000, tat: '1 Day' },
      { id: 'lancet', name: 'Lancet Laboratories', rating: 4.7, price: 9500, tat: '1 Day' },
      { id: 'medbury', name: 'Medbury Diagnostics', rating: 4.4, price: 7000, tat: '1 Day' },
      { id: 'evercare', name: 'Evercare Hospital', rating: 4.9, price: 12000, tat: '4 Hours' },
    ]
  },
  {
    id: 'malaria',
    name: 'Malaria Smear & Typhoid Panel',
    code: 'INF-08',
    category: 'infectious',
    description: 'Rapid diagnostic screening test for Plasmodium falciparum malaria and Salmonella antigens.',
    hospitals: [
      { id: 'synlab', name: 'Synlab Nigeria', rating: 4.8, price: 6500, tat: '4 Hours' },
      { id: 'lancet', name: 'Lancet Laboratories', rating: 4.7, price: 7500, tat: '4 Hours' },
      { id: 'medbury', name: 'Medbury Diagnostics', rating: 4.4, price: 5000, tat: '1 Day' },
      { id: 'evercare', name: 'Evercare Hospital', rating: 4.9, price: 9000, tat: '2 Hours' },
    ]
  },
  {
    id: 'prenatal',
    name: 'Prenatal Care Package',
    code: 'PRE-03',
    category: 'antenatal',
    description: 'Essential screening tests for expecting mothers including Blood Group, Genotype, and Infectious markers.',
    hospitals: [
      { id: 'synlab', name: 'Synlab Nigeria', rating: 4.8, price: 32000, tat: '1 Day' },
      { id: 'lancet', name: 'Lancet Laboratories', rating: 4.7, price: 35000, tat: '1 Day' },
      { id: 'medbury', name: 'Medbury Diagnostics', rating: 4.4, price: 28000, tat: '2 Days' },
      { id: 'evercare', name: 'Evercare Hospital', rating: 4.9, price: 40000, tat: '6 Hours' },
    ]
  }
];

const MOCK_HOSPITALS = [
  { id: 'lagoon', name: 'Lagoon Laboratory', location: 'Iyana Oworo', distance: 1.2, rating: 4.5, price: 2400, homeService: true },
  { id: 'evercare_lekki', name: 'Evercare Hospital', location: 'Lekki toll gate', distance: 2.4, rating: 4.8, price: 4500, homeService: true },
  { id: 'peak', name: 'Peak Diagnostic Laboratory', location: 'Oba-ile, Akure', distance: 3.5, rating: 4.7, price: 3000, homeService: false },
  { id: 'picco', name: 'Picco Labs', location: 'Ajah', distance: 4.8, rating: 4.2, price: 2000, homeService: true },
  { id: 'bmo', name: 'BMO Hospital', location: 'Ikeja', distance: 6.2, rating: 4.4, price: 5000, homeService: false },
  { id: 'evercare_obalende', name: 'Evercare', location: 'Obalende', distance: 1.8, rating: 4.3, price: 3800, homeService: true },
  { id: 'evercare_surulere', name: 'Evercare', location: 'Surulere', distance: 5.0, rating: 4.6, price: 4200, homeService: false }
];

const getCategoryTest = (categoryId) => {
  if (categoryId === 'antenatal') {
    return LAB_TESTS.find(t => t.category === 'antenatal') || LAB_TESTS[0];
  }
  if (categoryId === 'cardiac') {
    return LAB_TESTS.find(t => t.category === 'cardiac') || LAB_TESTS[0];
  }
  if (categoryId === 'hormones') {
    return LAB_TESTS.find(t => t.category === 'hormones') || LAB_TESTS[0];
  }
  if (categoryId === 'infectious') {
    return LAB_TESTS.find(t => t.category === 'infectious') || LAB_TESTS[0];
  }
  return LAB_TESTS.find(t => t.category === 'wellness') || LAB_TESTS[1];
};


const CATEGORIES = [
  { id: 'all', name: 'All Tests' },
  { id: 'wellness', name: 'General Wellness' },
  { id: 'cardiac', name: 'Heart & Cardiac' },
  { id: 'hormones', name: 'Hormones' },
  { id: 'diabetes', name: 'Diabetes' },
  { id: 'infectious', name: 'Infectious Diseases' }
];

const TIME_SLOTS = [
  '08:00 AM', '09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM'
];

function App() {
  // Navigation & Page State
  // 'splash' | 'landing' | 'signup-wizard' | 'verify-email' | 'dashboard' | 'results'
  const [currentScreen, setCurrentScreen] = useState('splash');
  
  // Sign-up State Wizard Flow (Progress Bar: 1/3)
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: 'Nigeria',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(10);
  const [isOtpActive, setIsOtpActive] = useState(false);
  
  // Login flow state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Session State
  const [currentUser, setCurrentUser] = useState(null);

  // Search & Catalog State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hospitalSearchQuery, setHospitalSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg, type = 'info') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedTest, setSelectedTest] = useState(LAB_TESTS[0]); // default compared test
  const [homeCollection, setHomeCollection] = useState(false); // boolean choice (+₦3,000)

  // Rebuilt 4-Step Booking Wizard State
  const [isBookingWizardActive, setIsBookingWizardActive] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [paymentTab, setPaymentTab] = useState('card'); // 'card' | 'transfer' | 'pay-at-lab'
  const [paymentOutcome, setPaymentOutcome] = useState(null); // 'success' | 'insufficient' | null
  const [bankTimer, setBankTimer] = useState(2709); // 45:09
  const [copiedValue, setCopiedValue] = useState(null);
  const [patientFirstName, setPatientFirstName] = useState('');
  const [patientLastName, setPatientLastName] = useState('');

  // Booking & Scheduler State
  const [selectedHospital, setSelectedHospital] = useState(LAB_TESTS[0].hospitals[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('08:00 AM');
  const [bookingStep, setBookingStep] = useState(1); // 1 = symptoms, 2 = schedule/type, 3 = confirm, 4 = checkout
  
  // Checkout Input States
  const [patientDetails, setPatientDetails] = useState({
    fullname: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  });
  const [cardError, setCardError] = useState('');
  const [paymentOtp, setPaymentOtp] = useState('');
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [showPaymentOtpChallenge, setShowPaymentOtpChallenge] = useState(false);

  // Users active bookings
  const [userBookings, setUserBookings] = useState([]);
  // Currently viewed result
  const [viewingResultBooking, setViewingResultBooking] = useState(null);

  // Bookings/Appointments Custom view state
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'bookings'
  const [bookingFilterTab, setBookingFilterTab] = useState('Upcoming'); // 'Upcoming' | 'Past' | 'Cancelled'
  const [bookingsSearchQuery, setBookingsSearchQuery] = useState('');
  const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);
  
  // Reschedule & cancellation states
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [showCancelReasonModal, setShowCancelReasonModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelComments, setCancelComments] = useState('');
  
  // Past feedback states
  const [showRateFeedbackModal, setShowRateFeedbackModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackTags, setFeedbackTags] = useState([]);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedPastBooking, setSelectedPastBooking] = useState(null);

  // Lab Profile screen states
  const [selectedLabProfile, setSelectedLabProfile] = useState(null);
  const [previousScreen, setPreviousScreen] = useState('dashboard');
  const [labProfileTab, setLabProfileTab] = useState('about');
  const [bookmarkedLabs, setBookmarkedLabs] = useState([]);

  // Refs for OTP Boxes
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Helper functions for 4-Step Booking Wizard
  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files.map(f => f.name)]);
  };

  const removeAttachedFile = (fileName) => {
    setAttachedFiles(prev => prev.filter(f => f !== fileName));
  };

  const handleCopyText = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedValue(fieldName);
    setTimeout(() => setCopiedValue(null), 2000);
  };

  const renderCircularProgress = (step) => {
    const percentage = (step / 4) * 100;
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (
      <div className="step-circle-progress">
        <svg width="42" height="42" viewBox="0 0 42 42">
          <circle className="circle-bg" cx="21" cy="21" r={radius} fill="transparent" stroke="rgba(226, 232, 240, 0.4)" strokeWidth="3" />
          <circle className="circle-fg" cx="21" cy="21" r={radius} fill="transparent" stroke="#2563eb" strokeWidth="3" 
                  strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" transform="rotate(-90 21 21)" />
        </svg>
        <span className="step-number">{step}/4</span>
      </div>
    );
  };

  const renderCalendar = () => {
    const daysInMonth = 31;
    const startOffset = 3; // July 2026 starts on Wednesday, so offset is 3 (Sun=0, Mon=1, Tue=2)
    const currentDay = 16;
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    const dayCells = [];
    // empty offset cells
    for (let i = 0; i < startOffset; i++) {
      dayCells.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const isPast = d < currentDay;
      const weekdaysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dateObj = {
        dayName: weekdaysList[(startOffset + d - 1) % 7],
        dayNum: d,
        month: 'July',
        year: 2026,
        fullDate: `${weekdaysList[(startOffset + d - 1) % 7]}, ${d} July, 2026`
      };
      
      const isActive = selectedDate?.dayNum === d && selectedDate?.month === 'July';
      
      dayCells.push(
        <div 
          key={`day-${d}`} 
          className={`calendar-day ${isPast ? 'past' : 'clickable'} ${isActive ? 'active' : ''}`}
          onClick={() => {
            if (!isPast) {
              setSelectedDate(dateObj);
            }
          }}
        >
          {d}
        </div>
      );
    }
    
    return (
      <div className="custom-calendar-widget">
        <div className="calendar-month-year">July 2026</div>
        <div className="calendar-weekdays">
          {weekdays.map(wd => <div key={wd} className="calendar-weekday">{wd}</div>)}
        </div>
        <div className="calendar-days-grid">
          {dayCells}
        </div>
      </div>
    );
  };

  // Splash screen transition automatically after 2.5s
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        // Check if there is an active local session preserved
        const savedUser = localStorage.getItem('etc_session');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setCurrentUser(parsed);
          // Set booking fields defaults
          setPatientDetails(prev => ({ ...prev, fullname: parsed.fullname }));
          // Load saved user bookings from localStorage
          const savedBookings = localStorage.getItem(`bookings_${parsed.email}`);
          if (savedBookings) {
            setUserBookings(JSON.parse(savedBookings));
          } else {
            localStorage.setItem(`bookings_${parsed.email}`, JSON.stringify(INITIAL_MOCK_BOOKINGS));
            setUserBookings(INITIAL_MOCK_BOOKINGS);
          }
          setCurrentScreen('dashboard');
        } else {
          setCurrentScreen('landing');
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Verification 10s countdown timer
  useEffect(() => {
    let interval = null;
    if (isOtpActive && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOtpActive, otpTimer]);

  // Bank countdown timer
  useEffect(() => {
    let interval = null;
    if (isBookingWizardActive && paymentTab === 'transfer' && bankTimer > 0) {
      interval = setInterval(() => {
        setBankTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBookingWizardActive, paymentTab, bankTimer]);

  const formatBankTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Trigger default dates
  useEffect(() => {
    // Generate next 7 dates for the booking scheduler
    const dates = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        dayName: weekdays[d.getDay()],
        dayNum: d.getDate(),
        month: d.toLocaleString('default', { month: 'short' }),
        fullDate: d.toDateString()
      });
    }
    setSelectedDate(dates[0]);
  }, []);

  // Form input validation logic
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!signupForm.firstName.trim()) errors.firstName = 'First name is required';
    if (!signupForm.lastName.trim()) errors.lastName = 'Last name is required';
    if (!signupForm.email.trim() || !/\S+@\S+\.\S+/.test(signupForm.email)) {
      errors.email = 'Please provide a valid email address';
    }
    if (signupForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    // Trigger OTP sending screen
    setIsOtpActive(true);
    setOtpTimer(10);
    setOtpCode(['', '', '', '']);
    setCurrentScreen('verify-email');
  };

  // OTP Shifting focus logic
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otpCode];
    newOtp[index] = value.substring(value.length - 1);
    setOtpCode(newOtp);

    // Shift to next box on type
    if (value && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Return back on backspace
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  // Trigger verify code & store session
  const verifyAndCreateUser = () => {
    const fullOtp = otpCode.join('');
    if (fullOtp.length < 4) {
      showToast('Please fill out all 4 OTP digits', 'success');
      return;
    }

    // Mock success code verification (any 4 digits will verify for demo)
    const newUser = {
      fullname: `${signupForm.firstName} ${signupForm.lastName}`,
      email: signupForm.email,
      country: signupForm.country
    };

    localStorage.setItem('etc_session', JSON.stringify(newUser));
    // Also save user to registered list for mock login checks
    const registered = JSON.parse(localStorage.getItem('etc_users') || '[]');
    registered.push({ ...newUser, password: signupForm.password });
    localStorage.setItem('etc_users', JSON.stringify(registered));

    setCurrentUser(newUser);
    setPatientDetails(prev => ({ ...prev, fullname: newUser.fullname }));
    setUserBookings([]);
    setIsOtpActive(false);
    setCurrentScreen('dashboard');
  };

  // Resend OTP logic
  const handleResendOtp = () => {
    setOtpTimer(10);
    setOtpCode(['', '', '', '']);
    setIsOtpActive(true);
    if (otpRefs[0].current) otpRefs[0].current.focus();
  };

  const openLabProfile = (lab, fromScreen) => {
    const normalized = {
      id: lab.id || lab.name.toLowerCase().replace(/\s+/g, '_'),
      name: lab.name,
      location: lab.location,
      distance: lab.distance || '2.4 km',
      rating: lab.rating || 4.5,
      homeService: lab.homeService !== undefined ? lab.homeService : true,
      price: lab.price || 2400,
      waitMinutes: lab.waitMinutes || 34,
      completedTestsCount: lab.completedTestsCount || 2,
      upcomingBookingsCount: lab.upcomingBookingsCount || 2,
      bio: lab.bio || 'Full-service diagnostic laboratory offering routine blood work, infection screening and hormone panels. Trained phlebotomists, same-day results on most rapid tests.',
      hours: lab.hours || 'Mon-Sat • 7:00am - 7:00pm',
      phone: lab.phone || '+234 801 234 5678',
      email: lab.email || `hello@${lab.name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'diagnostics'}.ng`,
      accreditation: lab.accreditation || 'NHREC accredited',
      popularTests: lab.popularTests || [
        { name: 'Heart beat test', price: 2400 },
        { name: 'Malaria smear test', price: 6500 },
        { name: 'Lipid panel', price: 15000 }
      ]
    };
    setSelectedLabProfile(normalized);
    setPreviousScreen(fromScreen);
    setLabProfileTab('about');
    setCurrentScreen('lab-profile');
  };

  const handleBookFromProfile = (popularTest) => {
    let testToBook = LAB_TESTS.find(t => t.name.toLowerCase().includes(popularTest.name.toLowerCase()) || popularTest.name.toLowerCase().includes(t.name.toLowerCase()));
    if (!testToBook) {
      testToBook = {
        id: popularTest.name.toLowerCase().replace(/\s+/g, '_'),
        name: popularTest.name,
        code: 'POP-' + Math.floor(10 + Math.random() * 90),
        category: 'wellness',
        description: `Diagnostic screening test for ${popularTest.name}.`,
        hospitals: []
      };
    }
    
    setSelectedTest(testToBook);
    setSelectedHospital({
      id: selectedLabProfile.id,
      name: selectedLabProfile.name,
      rating: selectedLabProfile.rating,
      price: popularTest.price,
      tat: '1 Day'
    });
    setHomeCollection(selectedLabProfile.homeService);
    setIsBookingWizardActive(true);
    setBookingStep(1);
  };

  const handleBookMainFromProfile = () => {
    const firstTest = selectedLabProfile.popularTests[0] || { name: 'Comprehensive Wellness Package', price: selectedLabProfile.price };
    handleBookFromProfile(firstTest);
  };

  // Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const registered = JSON.parse(localStorage.getItem('etc_users') || '[]');
    const matched = registered.find(u => u.email === loginEmail && u.password === loginPassword);

    if (matched) {
      const sessionUser = {
        fullname: matched.fullname,
        email: matched.email,
        country: matched.country
      };
      localStorage.setItem('etc_session', JSON.stringify(sessionUser));
      setCurrentUser(sessionUser);
      setPatientDetails(prev => ({ ...prev, fullname: sessionUser.fullname }));
      
      const savedBookings = localStorage.getItem(`bookings_${sessionUser.email}`);
      if (savedBookings) {
        setUserBookings(JSON.parse(savedBookings));
      } else {
        localStorage.setItem(`bookings_${sessionUser.email}`, JSON.stringify(INITIAL_MOCK_BOOKINGS));
        setUserBookings(INITIAL_MOCK_BOOKINGS);
      }
      setLoginError('');
      setCurrentScreen('dashboard');
    } else {
      setLoginError('Invalid email or password. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('etc_session');
    setCurrentUser(null);
    setCurrentScreen('landing');
  };

  const getFilteredHospitals = () => {
    let list = [...MOCK_HOSPITALS];
    
    // Real-time search filter
    if (hospitalSearchQuery.trim()) {
      const q = hospitalSearchQuery.toLowerCase();
      list = list.filter(h => h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q));
    }
    
    // Filter/Sort logic
    if (activeFilter === 'homeservice') {
      list = list.filter(h => h.homeService);
    } else if (activeFilter === 'nearest') {
      list.sort((a, b) => a.distance - b.distance);
    } else if (activeFilter === 'cheapest') {
      list.sort((a, b) => a.price - b.price);
    } else if (activeFilter === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }
    
    return list;
  };

  // Selection & Pricing
  const filteredTests = LAB_TESTS.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          test.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate fees
  const basePrice = selectedHospital ? selectedHospital.price : 0;
  const collectionFee = homeCollection ? 3000 : 0;
  const totalAmount = basePrice + collectionFee;

  // Next steps in booking flow
  const selectHospitalAndCompare = (test, hospital) => {
    setSelectedTest(test);
    setSelectedHospital(hospital);
    setHomeCollection(false); // Walk-in by default
    setIsBookingWizardActive(true);
    setBookingStep(1); // Start at Step 1: Symptoms
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!patientDetails.fullname.trim() || !patientDetails.phone.trim()) {
      showToast('Please fill out patient name and mobile number.', 'success');
      return;
    }
    setBookingStep(3); // Go to Payment / Checkout step
  };

  // Live Card number spacing
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    setPatientDetails(prev => ({ ...prev, cardNumber: formatted.substring(0, 19) }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setPatientDetails(prev => ({ ...prev, cardExpiry: value.substring(0, 5) }));
  };

  const handlePaySimulation = (e) => {
    e.preventDefault();
    setCardError('');
    if (patientDetails.cardNumber.length < 19) {
      setCardError('Please enter a valid 16-digit card number.');
      return;
    }
    if (patientDetails.cardExpiry.length < 5) {
      setCardError('Please enter card expiry date (MM/YY).');
      return;
    }
    if (patientDetails.cardCVV.length < 3) {
      setCardError('Please enter card security code.');
      return;
    }

    setIsSimulatingPayment(true);
    // Simulating bank authorization challenge
    setTimeout(() => {
      setIsSimulatingPayment(false);
      setShowPaymentOtpChallenge(true);
    }, 1500);
  };

  const verifyPaymentOtpSubmit = (e) => {
    e.preventDefault();
    if (paymentOtp.length < 4) {
      showToast('Please enter the 4-digit bank verification OTP.', 'success');
      return;
    }

    // Save booking to active list
    const newBooking = {
      id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
      testName: selectedTest.name,
      testCode: selectedTest.code,
      hospitalName: selectedHospital.name,
      appointmentDate: selectedDate ? selectedDate.fullDate : new Date().toDateString(),
      appointmentTime: selectedTimeSlot,
      patientName: patientDetails.fullname,
      patientPhone: patientDetails.phone,
      collectionMethod: homeCollection ? 'Home Collection' : 'Walk-in Clinic',
      totalPaid: totalAmount,
      status: 'Scheduled', // will toggle completed for result demo
      createdAt: new Date().toLocaleDateString()
    };

    const updatedBookings = [newBooking, ...userBookings];
    setUserBookings(updatedBookings);
    localStorage.setItem(`bookings_${currentUser.email}`, JSON.stringify(updatedBookings));

    // Reset wizard
    setShowPaymentOtpChallenge(false);
    setPaymentOtp('');
    setBookingStep(1);
    
    // Jump directly to result dashboard screen
    showToast(`Appointment Booking Successful! Reference: ${newBooking.id}`, 'success');
  };

  // Simulating Test Completion (to view demo pdf results)
  const triggerResultReady = (bookingId) => {
    const updated = userBookings.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'Completed' };
      }
      return b;
    });
    setUserBookings(updated);
    localStorage.setItem(`bookings_${currentUser.email}`, JSON.stringify(updated));
  };

  // Mock download report print logic
  const handlePrintDownload = () => {
    window.print();
  };

  // Next Dates Array for rendering
  const getNextDates = () => {
    const dates = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        dayName: weekdays[d.getDay()],
        dayNum: d.getDate(),
        month: d.toLocaleString('default', { month: 'short' }),
        fullDate: d.toDateString(),
        dateString: d.toDateString() // for active selection state matching
      });
    }
    return dates;
  };

  // Booking Action Handlers
  const handleBookAgain = (booking) => {
    const testMatch = LAB_TESTS.find(t => t.name === booking.testName) || LAB_TESTS[0];
    const hospitalMatch = testMatch?.hospitals.find(h => h.name === booking.hospitalName) || testMatch?.hospitals[0];
    
    setSelectedTest(testMatch);
    if (hospitalMatch) {
      setSelectedHospital(hospitalMatch);
    }
    setHomeCollection(booking.collectionMethod === 'Home Collection');
    setIsBookingWizardActive(true);
    setBookingStep(1);
    setCurrentView('home');
    setSelectedBookingDetail(null);
  };

  const handleConfirmReschedule = (newDate, newTime) => {
    const updated = userBookings.map(b => {
      if (b.id === selectedBookingDetail.id) {
        return { ...b, appointmentDate: newDate, appointmentTime: newTime };
      }
      return b;
    });
    setUserBookings(updated);
    localStorage.setItem(`bookings_${currentUser?.email || 'guest'}`, JSON.stringify(updated));
    setShowRescheduleModal(false);
    setSelectedBookingDetail(prev => ({ ...prev, appointmentDate: newDate, appointmentTime: newTime }));
    showToast('Appointment rescheduled successfully.', 'success');
  };

  const handleCancelSubmit = () => {
    const updated = userBookings.map(b => {
      if (b.id === selectedBookingDetail.id) {
        return { ...b, status: 'Cancelled' };
      }
      return b;
    });
    setUserBookings(updated);
    localStorage.setItem(`bookings_${currentUser?.email || 'guest'}`, JSON.stringify(updated));
    
    setShowCancelReasonModal(false);
    setShowCancelConfirmModal(false);
    
    setCancelReason('');
    setCancelComments('');
    
    setSelectedBookingDetail(null); 
    setBookingFilterTab('Cancelled');
    showToast('Booking cancelled successfully.', 'success');
  };

  return (
    <div className="app-container">
      
      {/* 1. SPLASH SCREEN */}
      {currentScreen === 'splash' && (
        <div className="splash-container">
          <div className="splash-logo-container">
            <div className="splash-logo-ring"></div>
            <Activity className="splash-icon" />
          </div>
          <h1 className="splash-title">ETC DIAGNOSTICS</h1>
          <p className="splash-tagline">THE LAB TEST • COMPARE & BOOK</p>
        </div>
      )}

      {/* HEADER & BRAND */}
      {currentScreen !== 'splash' && currentScreen !== 'dashboard' && (
        <header className="app-header">
          <div className="header-brand" onClick={() => currentUser ? setCurrentScreen('dashboard') : setCurrentScreen('landing')}>
            <Activity color="#4A80F5" size={28} />
            <span>ETC<span className="brand-dot">.</span><span style={{fontWeight: 400, fontSize: '1.25rem', color: '#64748b'}}>The Lab Test</span></span>
          </div>

          <div className="header-nav">
            {currentUser ? (
              <div className="nav-user">
                <span className="avatar">
                  {currentUser.fullname.split(' ').map(n => n[0]).join('')}
                </span>
                <span style={{fontWeight: 600, fontSize: '0.9rem'}}>{currentUser.fullname}</span>
                <button className="btn btn-secondary" style={{padding: '0.4rem 0.8rem', fontSize: '0.8rem'}} onClick={handleLogout}>
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <div style={{display: 'flex', gap: '1rem'}}>
                <button className="btn btn-secondary" onClick={() => setCurrentScreen('landing')}>Sign In</button>
                <button className="btn btn-primary" onClick={() => setCurrentScreen('signup-wizard')}>Create Account</button>
              </div>
            )}
          </div>
        </header>
      )}

      <main className="main-content">
        
        {/* 2. LANDING SCREEN */}
        {currentScreen === 'landing' && (
          <div className="hero-section animate-fade-in">
            <div>
              <div className="hero-badge">
                <ShieldCheck size={16} /> Trusted by over 50,000 Nigerians
              </div>
              <h1 className="hero-title">Compare local lab prices. Book in seconds.</h1>
              <p className="hero-subtitle">
                Compare test rates across Synlab, Lancet, Evercare, and Medbury. 
                Schedule an appointment at home or walk in directly. Secure digital reports inside.
              </p>
              
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => setCurrentScreen('signup-wizard')}>
                  Register Account <ArrowRight size={18} />
                </button>
                <a href="#quick-login" className="btn btn-secondary" onClick={() => {
                  const el = document.getElementById('login-form-area');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Access Dashboard
                </a>
              </div>
            </div>

            {/* Login & Demo Area */}
            <div id="login-form-area" className="auth-card" style={{margin: '0 auto'}}>
              <div className="auth-header">
                <h2 className="auth-title">Sign In to ETC</h2>
                <p className="auth-desc">Welcome back! Access your results and appointments</p>
              </div>

              {loginError && (
                <div className="form-error" style={{marginBottom: '1rem', justifyContent: 'center', backgroundColor: 'hsl(var(--danger-light))', padding: '0.5rem', borderRadius: '4px'}}>
                  <AlertTriangle size={16} />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="name@example.com" 
                    value={loginEmail} 
                    onChange={(e) => setLoginEmail(e.target.value)} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="••••••••" 
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)} 
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Sign In <ChevronRight size={16} />
                </button>
              </form>

              <div className="divider">or login with</div>

              <button className="btn btn-oauth" onClick={() => {
                // Mock social login
                const mockSocial = { fullname: 'Chinedu Okafor', email: 'chinedu@example.com', country: 'Nigeria' };
                localStorage.setItem('etc_session', JSON.stringify(mockSocial));
                setCurrentUser(mockSocial);
                setPatientDetails(prev => ({ ...prev, fullname: mockSocial.fullname }));
                setCurrentScreen('dashboard');
              }}>
                Continue with Google
              </button>
              
              <button className="btn btn-oauth" onClick={() => {
                const mockSocial = { fullname: 'Amina Bello', email: 'amina@example.com', country: 'Nigeria' };
                localStorage.setItem('etc_session', JSON.stringify(mockSocial));
                setCurrentUser(mockSocial);
                setPatientDetails(prev => ({ ...prev, fullname: mockSocial.fullname }));
                setCurrentScreen('dashboard');
              }}>
                Continue with Apple
              </button>
              
              <div style={{textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem'}}>
                Don't have an account? <a href="#" onClick={() => setCurrentScreen('signup-wizard')}>Create one here</a>
              </div>
            </div>
          </div>
        )}

        {/* 3. MULTI-STEP SIGN-UP WIZARD */}
        {currentScreen === 'signup-wizard' && (
          <div className="auth-wrapper">
            <div className="auth-card animate-scale-in">
              <div className="auth-header">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-desc">Step 1 of 2: Profile Details</p>
              </div>

              {/* Progress Bar 1/3 (50% complete towards step 2) */}
              <div className="wizard-progress">
                <div className="wizard-progress-bar" style={{width: '50%'}}></div>
                <div className="wizard-step active">1</div>
                <div className="wizard-step">2</div>
              </div>

              <form onSubmit={handleSignupSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Tunde"
                      value={signupForm.firstName}
                      onChange={(e) => setSignupForm({...signupForm, firstName: e.target.value})}
                    />
                    {formErrors.firstName && <span className="form-error"><AlertTriangle size={12}/>{formErrors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Alao"
                      value={signupForm.lastName}
                      onChange={(e) => setSignupForm({...signupForm, lastName: e.target.value})}
                    />
                    {formErrors.lastName && <span className="form-error"><AlertTriangle size={12}/>{formErrors.lastName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Country of Residence</label>
                  <select 
                    className="form-input"
                    value={signupForm.country}
                    onChange={(e) => setSignupForm({...signupForm, country: e.target.value})}
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="tunde.alao@example.com"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                  />
                  {formErrors.email && <span className="form-error"><AlertTriangle size={12}/>{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="••••••••"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                  />
                  {formErrors.password && <span className="form-error"><AlertTriangle size={12}/>{formErrors.password}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Repeat Password</label>
                  <input 
                    type="password" 
                    className="form-input" 
                    placeholder="••••••••"
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                  />
                  {formErrors.confirmPassword && <span className="form-error"><AlertTriangle size={12}/>{formErrors.confirmPassword}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-full" style={{marginTop: '1rem'}}>
                  Continue to Verification <ArrowRight size={16}/>
                </button>
              </form>

              <div style={{textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem'}}>
                Already have an account? <a href="#" onClick={() => setCurrentScreen('landing')}>Sign In</a>
              </div>
            </div>
          </div>
        )}

        {/* 4. VERIFY EMAIL SCREEN */}
        {currentScreen === 'verify-email' && (
          <div className="auth-wrapper">
            <div className="auth-card animate-scale-in">
              <div className="auth-header">
                <h2 className="auth-title">Verify Email</h2>
                <p className="auth-desc">We've sent a 4-digit code to <strong>{signupForm.email}</strong></p>
              </div>

              {/* Progress Bar 2/2 completed */}
              <div className="wizard-progress">
                <div className="wizard-progress-bar" style={{width: '100%'}}></div>
                <div className="wizard-step completed"><Check size={14}/></div>
                <div className="wizard-step active">2</div>
              </div>

              <div className="otp-container">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpRefs[idx]}
                    type="text"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="otp-box"
                  />
                ))}
              </div>

              <button className="btn btn-primary btn-full" onClick={verifyAndCreateUser}>
                Verify & Create Account <CheckCircle size={16}/>
              </button>

              <div className="countdown-text">
                {otpTimer > 0 ? (
                  <span>Resend code in <strong>{otpTimer}s</strong></span>
                ) : (
                  <button className="resend-link" onClick={handleResendOtp}>
                    Resend Code
                  </button>
                )}
              </div>

              <div style={{textAlign: 'center', marginTop: '2rem'}}>
                <button className="btn btn-secondary btn-full" onClick={() => setCurrentScreen('signup-wizard')}>
                  Back to Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. PATIENT DASHBOARD */}
        {currentScreen === 'dashboard' && (
          <div className="dashboard-layout">
            
            {/* Left sidebar nav for desktop (>= 1024px) */}
            <aside className="desktop-sidebar">
              <div className="sidebar-brand" onClick={() => setCurrentScreen('dashboard')}>
                <Activity color="#4A80F5" size={24} />
                <span>ETC<span className="brand-dot">.</span><span style={{fontWeight: 400, fontSize: '0.9rem', color: '#64748b', marginLeft: '4px'}}>The Lab Test</span></span>
              </div>
              
              <div className="sidebar-links">
                <div className={`sidebar-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => {
                  setCurrentView('home');
                  setSelectedBookingDetail(null);
                }}>
                  <Home size={18} />
                  <span>Home</span>
                </div>
                <div className={`sidebar-link ${currentView === 'bookings' ? 'active' : ''}`} onClick={() => {
                  setCurrentView('bookings');
                  setSelectedBookingDetail(null);
                }}>
                  <Calendar size={18} />
                  <span>Bookings</span>
                </div>
                <div className="sidebar-link" onClick={() => {
                  setCurrentView('home');
                  setTimeout(() => {
                    const el = document.getElementById('search-catalog-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}>
                  <Search size={18} />
                  <span>Find Tests</span>
                </div>
                <div className="sidebar-link" onClick={() => {
                  if (userBookings.length > 0) {
                    const firstCompleted = userBookings.find(b => b.status === 'Completed');
                    if (firstCompleted) {
                      setViewingResultBooking(firstCompleted);
                      setCurrentScreen('results');
                    } else {
                      showToast('Please simulate a Completed test first by clicking "Mark Completed" on your scheduled bookings.', 'success');
                    }
                  } else {
                    showToast('No appointments booked yet. Find and compare tests below to book!', 'success');
                  }
                }}>
                  <Activity size={18} />
                  <span>Reports</span>
                </div>
                <div className={`sidebar-link ${currentView === 'laboratories' ? 'active' : ''}`} onClick={() => {
                  setCurrentView('laboratories');
                  setSelectedBookingDetail(null);
                }}>
                  <MapPin size={18} />
                  <span>Laboratories</span>
                </div>
                <div className={`sidebar-link ${currentView === 'profile' ? 'active' : ''}`} onClick={() => {
                  setCurrentView('profile');
                  setSelectedBookingDetail(null);
                }}>
                  <User size={18} />
                  <span>Profile</span>
                </div>
              </div>

              <div className="sidebar-user-section">
                <div className="sidebar-user-info">
                  <span className="avatar">
                    {currentUser?.fullname?.split(' ').map(n => n[0]).join('') || 'S'}
                  </span>
                  <div className="user-details">
                    <div className="user-name">{currentUser?.fullname || 'Sewa'}</div>
                    <div className="user-email">{currentUser?.email || 'sewa@example.com'}</div>
                  </div>
                </div>
                <button className="btn btn-secondary btn-full btn-logout" onClick={handleLogout}>
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </aside>

            {/* Center main scrollable content */}
            <div className="dashboard-main-container">
              <div className="dashboard-content-wrapper">
              {currentView === 'home' ? (
                <>
                  {/* Welcoming content header */}
                  <div className="dashboard-content-header">
                    <div>
                      <h1 className="welcome-title">Hi, {currentUser?.fullname ? currentUser.fullname.split(' ')[0] : 'Sewa'} 👋</h1>
                      <p className="welcome-subtitle">Let's check your health status today.</p>
                    </div>
                    <div className="header-actions-group">
                      <button className="notification-bell" onClick={() => showToast('You have no new notifications.', 'success')}>
                        <Bell size={22} />
                        <span className="bell-badge"></span>
                      </button>
                      <button className="mobile-logout-btn" onClick={handleLogout} title="Logout">
                        <LogOut size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Search input bar & Walk-in / Home selector */}
                  <div className="dashboard-section search-section">
                    <div className="search-bar-row">
                      <div className="search-input-wrapper">
                        <Search className="search-icon-inside" size={18} />
                        <input 
                          type="text" 
                          className="form-input search-input-custom" 
                          placeholder="Search for blood tests, labs, packages..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="collection-toggle">
                        <button 
                          type="button" 
                          className={`toggle-btn ${!homeCollection ? 'active' : ''}`}
                          onClick={() => setHomeCollection(false)}
                        >
                          Walk-in
                        </button>
                        <button 
                          type="button" 
                          className={`toggle-btn ${homeCollection ? 'active' : ''}`}
                          onClick={() => setHomeCollection(true)}
                        >
                          <MapPin size={14}/> Home
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile-only Upcoming Appointment Card */}
                  <div className="mobile-only-section">
                    <div className="section-header">
                      <h2>Upcoming Appointment</h2>
                    </div>
                    <div className="upcoming-appointment-card blue-card" onClick={() => {
                      const upcoming = userBookings.find(b => b.status === 'Scheduled' || b.status === 'Confirmed');
                      if (upcoming) {
                        setSelectedBookingDetail(upcoming);
                        setCurrentView('bookings');
                      } else {
                        showToast('No upcoming bookings yet. Book a new test below!', 'success');
                      }
                    }}>
                      <div className="appointment-card-content">
                        <div className="appointment-icon-wrapper">
                          <Calendar size={20} color="#fff" />
                        </div>
                        <div className="appointment-text">
                          <h3>{userBookings.find(b => b.status === 'Scheduled' || b.status === 'Confirmed')?.testName || 'Malaria Test'}</h3>
                          <p>{userBookings.find(b => b.status === 'Scheduled' || b.status === 'Confirmed')?.hospitalName || 'Peak Diagnostic Laboratory'}</p>
                          <span className="appointment-time-capsule">
                            {userBookings.find(b => b.status === 'Scheduled' || b.status === 'Confirmed')?.appointmentDate || '16 May, 2026'} • {userBookings.find(b => b.status === 'Scheduled' || b.status === 'Confirmed')?.appointmentTime || '3:00 PM'}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="appointment-chevron" size={20} />
                    </div>
                  </div>

                  {/* Categories Grid */}
                  <div className="dashboard-section categories-section">
                    <div className="section-header">
                      <h2>Categories</h2>
                    </div>
                    <div className="categories-grid">
                      {CATEGORIES_WITH_ICONS.map((cat) => (
                        <div 
                          key={cat.id} 
                          className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setHospitalSearchQuery('');
                            setActiveFilter('');
                            setCurrentScreen('category-detail');
                          }}
                        >
                          <div className="category-icon-wrapper">
                            {cat.icon}
                          </div>
                          <span className="category-name">{cat.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Labs Near You grid */}
                  <div className="dashboard-section labs-section">
                    <div className="section-header">
                      <h2>Labs Near You</h2>
                      <span className="see-all-link" onClick={() => setCurrentView('laboratories')}>See All</span>
                    </div>
                    <div className="labs-grid">
                      {MOCK_HOSPITALS.slice(0, 3).map((lab, idx) => (
                        <div 
                          key={idx} 
                          className="lab-near-card"
                          onClick={() => openLabProfile(lab, 'dashboard')}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="lab-near-info">
                            <div className="lab-near-avatar">
                              <MapPin size={18} />
                            </div>
                            <div>
                              <h3>{lab.name}</h3>
                              <p>{lab.location} • {lab.distance}</p>
                            </div>
                          </div>
                          <div className="lab-near-meta">
                            <span className="rating-badge">
                              <Star size={12} fill="currentColor" /> {lab.rating}
                            </span>
                            <button className="btn btn-secondary btn-sm" onClick={(e) => {
                              e.stopPropagation();
                              openLabProfile(lab, 'dashboard');
                            }}>Book</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile-only Book Again Row */}
                  <div className="mobile-only-section">
                    <div className="section-header">
                      <h2>Book Again</h2>
                    </div>
                    <div className="book-again-card">
                      <div className="book-again-info">
                        <div className="book-again-icon">
                          <Heart size={20} color="#ef4444" />
                        </div>
                        <div>
                          <h3>Heart beat test</h3>
                          <p>Evercare Hospital • ₦2,400</p>
                        </div>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={() => {
                        const testMatch = LAB_TESTS.find(t => t.id === 'lipid');
                        const hospital = testMatch?.hospitals.find(h => h.id === 'evercare');
                        if (testMatch && hospital) {
                          selectHospitalAndCompare(testMatch, hospital);
                        } else {
                          showToast('Proceeding to schedule Heart Beat Test...', 'success');
                        }
                      }}>
                        Book again
                      </button>
                    </div>
                  </div>

                  {/* Educational Videos Section */}
                  <div className="dashboard-section videos-section">
                    <div className="section-header">
                      <h2>Hear what your body is telling you</h2>
                    </div>
                    <div className="videos-list">
                      {VIDEOS.map((vid, idx) => (
                        <div key={idx} className="video-card" onClick={() => showToast(`Playing: ${vid.title}`, 'success')}>
                          <div className="video-thumbnail-wrapper">
                            <img src={vid.thumbnail} alt={vid.title} className="video-thumbnail" />
                            <div className="video-play-overlay">
                              <div className="play-button-circle">
                                <Play size={14} fill="currentColor" />
                              </div>
                            </div>
                            <span className="video-duration">{vid.duration}</span>
                          </div>
                          <div className="video-info">
                            <h3>{vid.title}</h3>
                            <p>{vid.doctor}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compare catalog laboratory pricing list */}
                  <div className="dashboard-section catalog-section" id="search-catalog-anchor">
                    <div className="section-header">
                      <h2>Compare & Book Test Packages</h2>
                    </div>
                    <div className="test-grid">
                      {filteredTests.map((test) => {
                        const prices = test.hospitals.map(h => h.price);
                        const minPrice = Math.min(...prices);
                        return (
                          <div 
                            key={test.id} 
                            className={`test-card ${selectedTest?.id === test.id ? 'selected-highlight' : ''}`}
                            onClick={() => setSelectedTest(test)}
                          >
                            <div>
                              <div className="test-meta">
                                <span className={`test-tag ${test.category}`}>{test.category}</span>
                                <span className="test-code-badge">{test.code}</span>
                              </div>
                              <h3 className="test-name">{test.name}</h3>
                              <p className="test-desc">{test.description}</p>
                            </div>
                            <div className="test-bottom">
                              <div>
                                <span className="from-label">FROM</span>
                                <span className="price-bold">₦{minPrice.toLocaleString()}</span>
                              </div>
                              <button className="btn btn-secondary compare-btn">
                                Compare Labs
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {selectedTest && (
                      <div className="comparison-container animate-scale-in">
                        <div className="comparison-header">
                          <div>
                            <span className="comparison-subtitle">Lab comparison chart</span>
                            <h3 className="comparison-title">{selectedTest.name}</h3>
                          </div>
                          <div className="method-indicator">
                            <span className="method-label">Method:</span>
                            <div className="method-value">{homeCollection ? 'Home Sample Extraction' : 'Walk-in Clinic'}</div>
                          </div>
                        </div>
                        <div className="table-responsive">
                          <table className="compare-table">
                            <thead>
                              <tr>
                                <th>Laboratory Center</th>
                                <th>Turn-around Time</th>
                                <th>Base Cost</th>
                                <th>{homeCollection ? 'Extraction' : 'Clinic Fee'}</th>
                                <th>Grand Total</th>
                                <th style={{textAlign: 'right'}}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedTest.hospitals.map((hospital) => {
                                const hospTotal = hospital.price + collectionFee;
                                return (
                                  <tr key={hospital.id}>
                                    <td>
                                      <div className="lab-info">
                                        <div className="lab-icon-box">{hospital.name.charAt(0)}</div>
                                        <div>
                                          <div className="lab-name-sub">{hospital.name}</div>
                                          <div className="lab-rating">
                                            <Star size={12} fill="currentColor" /> {hospital.rating}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <span className="tat-badge">
                                        <Clock size={14} /> {hospital.tat}
                                      </span>
                                    </td>
                                    <td>₦{hospital.price.toLocaleString()}</td>
                                    <td>{homeCollection ? `+₦${collectionFee.toLocaleString()}` : 'Free'}</td>
                                    <td className="grand-total-cell">₦{hospTotal.toLocaleString()}</td>
                                    <td style={{textAlign: 'right'}}>
                                      <button 
                                        className="btn btn-primary btn-sm"
                                        onClick={() => selectHospitalAndCompare(selectedTest, hospital)}
                                      >
                                        Book Slot
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* RECENT ACTIVITY / ACTIVE BOOKINGS */}
                  {userBookings.length > 0 && (
                    <div className="dashboard-section bookings-log-section">
                      <div className="section-header" style={{marginBottom: '1.25rem'}}>
                        <h2 style={{fontSize: '1.25rem', fontWeight: 800, color: 'hsl(var(--neutral-800))'}}>Recent Activity</h2>
                        <p style={{fontSize: '0.85rem', color: 'hsl(var(--neutral-500))', marginTop: '0.15rem'}}>Track and manage your ongoing tests and results.</p>
                      </div>
                      <div className="active-bookings-list">
                        {userBookings.map((booking) => (
                          <div key={booking.id} className={`home-booking-card ${booking.status.toLowerCase()} animate-scale-in`}>
                            <div className="home-booking-header">
                              <div className="home-booking-title-group">
                                <span className="home-booking-id">{booking.id}</span>
                                <h3 className="home-booking-test-name">{booking.testName}</h3>
                              </div>
                              <span className={`home-status-badge ${booking.status.toLowerCase()}`}>
                                {booking.status === 'Scheduled' ? 'Awaiting Analysis' : booking.status}
                              </span>
                            </div>
                            
                            <div className="home-booking-body">
                              <div className="home-booking-detail-item">
                                <MapPin size={15} className="detail-icon" />
                                <span>{booking.hospitalName}</span>
                              </div>
                              <div className="home-booking-detail-item">
                                <Calendar size={15} className="detail-icon" />
                                <span>{booking.appointmentDate} • {booking.appointmentTime}</span>
                              </div>
                              <div className="home-booking-detail-item">
                                <Activity size={15} className="detail-icon" />
                                <span>{booking.collectionMethod}</span>
                              </div>
                            </div>
                            
                            <div className="home-booking-footer">
                              {booking.status === 'Scheduled' && (
                                <button 
                                  className="btn btn-simulate"
                                  onClick={() => triggerResultReady(booking.id)}
                                >
                                  Simulate Results Ready
                                </button>
                              )}
                              
                              <button 
                                className={`btn ${booking.status === 'Completed' ? 'btn-primary btn-view-results' : 'btn-outline-details'}`}
                                onClick={() => {
                                  if (booking.status === 'Completed') {
                                    setViewingResultBooking(booking);
                                    setCurrentScreen('results');
                                  } else {
                                    setSelectedBookingDetail(booking);
                                    setCurrentView('bookings');
                                  }
                                }}
                              >
                                {booking.status === 'Completed' ? 'View Diagnostic Results' : 'View Details'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : currentView === 'bookings' ? (
                <div className="bookings-tab-content">
                  {selectedBookingDetail ? (
                    <div className="booking-details-wrapper animate-fade-in">
                      <div className="booking-details-header">
                        <button className="icon-btn-back-custom" onClick={() => setSelectedBookingDetail(null)}>
                          <ArrowLeft size={18} />
                          <span>Back to bookings</span>
                        </button>
                      </div>
                      
                      <div className="booking-details-card">
                        <div className="details-card-row">
                          <div>
                            <h3 className="details-test-name">{selectedBookingDetail.testName}</h3>
                            <p className="details-lab-name">{selectedBookingDetail.hospitalName} • <span className="details-distance">2.4 km away</span></p>
                          </div>
                          <span className="details-price">₦{Number(selectedBookingDetail.totalPaid).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="booking-parameters-section">
                        <h4 className="params-title">Booking Details</h4>
                        <div className="params-list">
                          <div className="param-item">
                            <div className="param-icon-wrapper">
                              <Calendar size={18} />
                            </div>
                            <div className="param-text">
                              <span className="param-label">Date & Time</span>
                              <span className="param-value">{selectedBookingDetail.appointmentDate} • {selectedBookingDetail.appointmentTime}</span>
                            </div>
                          </div>
                          
                          <div className="param-item">
                            <div className="param-icon-wrapper">
                              <Phone size={18} />
                            </div>
                            <div className="param-text">
                              <span className="param-label">Phone Number</span>
                              <span className="param-value">{selectedBookingDetail.patientPhone || '08012345678'}</span>
                            </div>
                          </div>
                          
                          <div className="param-item">
                            <div className="param-icon-wrapper">
                              <Mail size={18} />
                            </div>
                            <div className="param-text">
                              <span className="param-label">Email Address</span>
                              <span className="param-value">{currentUser?.email || 'sewa@example.com'}</span>
                            </div>
                          </div>
                          
                          <div className="param-item">
                            <div className="param-icon-wrapper">
                              <Activity size={18} />
                            </div>
                            <div className="param-text">
                              <span className="param-label">Appointment Type</span>
                              <span className="param-value">{selectedBookingDetail.collectionMethod}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="results-alert-banner">
                        <Info size={20} className="alert-banner-icon" />
                        <p>Results normally arrive within few days after appointment. You can view them on the reports tab.</p>
                      </div>
                      
                      <div className="booking-details-actions">
                        <button className="btn-cancel-booking" onClick={() => setShowCancelConfirmModal(true)}>
                          Cancel booking
                        </button>
                        <button className="btn btn-primary" onClick={() => {
                          // Select date for reschedule picker
                          const dates = getNextDates();
                          setSelectedDate(dates[0]);
                          setShowRescheduleModal(true);
                        }}>
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bookings-list-view">
                      <div className="bookings-view-header">
                        <h2>My Bookings</h2>
                        <p className="welcome-subtitle">Track and manage your lab test appointments.</p>
                      </div>

                      {/* Renders search bar matching Figma design */}
                      <div className="bookings-search-wrapper">
                        <div className="search-input-wrapper">
                          <Search className="search-icon-inside" size={18} />
                          <input 
                            type="text" 
                            className="form-input search-input-custom" 
                            placeholder="Search by test name or hospital..." 
                            value={bookingsSearchQuery}
                            onChange={(e) => setBookingsSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Tab selector pills */}
                      <div className="bookings-tabs-row">
                        {['Upcoming', 'Past', 'Cancelled'].map((tab) => (
                          <button
                            key={tab}
                            className={`booking-tab-pill ${bookingFilterTab === tab ? 'active' : ''}`}
                            onClick={() => setBookingFilterTab(tab)}
                          >
                            {tab}
                            {bookingFilterTab === tab && <span className="active-pill-indicator"></span>}
                          </button>
                        ))}
                      </div>

                      {/* Filter & render list cards */}
                      <div className="booking-cards-list">
                        {userBookings
                          .filter(b => {
                            const matchesSearch = b.testName.toLowerCase().includes(bookingsSearchQuery.toLowerCase()) || 
                                                  b.hospitalName.toLowerCase().includes(bookingsSearchQuery.toLowerCase());
                            if (!matchesSearch) return false;
                            if (bookingFilterTab === 'Upcoming') {
                              return b.status === 'Scheduled' || b.status === 'Confirmed';
                            } else if (bookingFilterTab === 'Past') {
                              return b.status === 'Completed' || b.status === 'Result ready';
                            } else if (bookingFilterTab === 'Cancelled') {
                              return b.status === 'Cancelled';
                            }
                            return true;
                          })
                          .map((booking) => {
                            const isUpcoming = booking.status === 'Scheduled' || booking.status === 'Confirmed';
                            const isPast = booking.status === 'Completed' || booking.status === 'Result ready';
                            const isCancelled = booking.status === 'Cancelled';
                            
                            return (
                              <div className="booking-list-card premium-hover-card animate-premium-scale-in" key={booking.id}>
                                <div className="booking-card-header">
                                  <div className="booking-id-tag">
                                    <span className="booking-id-label">ID:</span>
                                    <span className="booking-id-value">{booking.id.substring(0, 9)}</span>
                                  </div>
                                  <span className={`booking-status-pill ${booking.status.toLowerCase().replace(' ', '-')}`}>
                                    {booking.status}
                                  </span>
                                </div>

                                <div className="booking-card-body">
                                  <h3 className="booking-card-test-name">{booking.testName}</h3>
                                  <p className="booking-card-sub">{booking.hospitalName}</p>
                                  
                                  <div className="booking-card-type-row">
                                    <span className="type-label">Type:</span>
                                    <span className="type-value">{booking.collectionMethod}</span>
                                  </div>

                                  <div className="booking-datetime-capsule">
                                    <Calendar size={14} className="capsule-icon" />
                                    <span>{booking.appointmentDate} • {booking.appointmentTime}</span>
                                  </div>
                                </div>
                                
                                <div className="booking-card-footer-actions">
                                  {isUpcoming && (
                                    <button 
                                      className="btn btn-secondary btn-sm btn-simulate" 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        triggerResultReady(booking.id);
                                      }}
                                    >
                                      Simulate results ready
                                    </button>
                                  )}
                                  
                                  <button 
                                    className="btn btn-outline btn-sm btn-view" 
                                    onClick={() => {
                                      if (isPast) {
                                        setSelectedPastBooking(booking);
                                        setFeedbackRating(0);
                                        setFeedbackTags([]);
                                        setFeedbackText('');
                                        setShowRateFeedbackModal(true);
                                      } else {
                                        setSelectedBookingDetail(booking);
                                      }
                                    }}
                                  >
                                    View details
                                  </button>

                                  <button 
                                    className="btn btn-primary btn-sm btn-rebook" 
                                    onClick={() => handleBookAgain(booking)}
                                  >
                                    Book again
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        {userBookings.filter(b => {
                          const matchesSearch = b.testName.toLowerCase().includes(bookingsSearchQuery.toLowerCase()) || 
                                                b.hospitalName.toLowerCase().includes(bookingsSearchQuery.toLowerCase());
                          if (!matchesSearch) return false;
                          if (bookingFilterTab === 'Upcoming') {
                            return b.status === 'Scheduled' || b.status === 'Confirmed';
                          } else if (bookingFilterTab === 'Past') {
                            return b.status === 'Completed' || b.status === 'Result ready';
                          } else if (bookingFilterTab === 'Cancelled') {
                            return b.status === 'Cancelled';
                          }
                          return true;
                        }).length === 0 && (
                          <div className="empty-bookings-state">
                            <p>No {bookingFilterTab.toLowerCase()} bookings found matching your search.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : currentView === 'laboratories' ? (
                <>
                  <div className="dashboard-content-header" style={{ marginBottom: '1.5rem' }}>
                    <h1 className="section-title">All Laboratories</h1>
                  </div>
                  <div className="hospital-list">
                    {MOCK_HOSPITALS.map((hosp) => (
                      <div 
                        key={hosp.id} 
                        className="hospital-card animate-scale-in"
                        onClick={() => openLabProfile(hosp, 'dashboard')}
                      >
                        <div className="hospital-card-content">
                          <div className="hospital-icon-box">
                            <MapPin size={20} color="hsl(var(--primary))" />
                          </div>
                          <div className="hospital-info">
                            <h3 className="hospital-name">{hosp.name}</h3>
                            <p className="hospital-location">{hosp.location}</p>
                            <div className="hospital-meta-row">
                              <span className="distance-badge">{hosp.distance} km</span>
                              <span className="rating-badge-inline">
                                <Star size={12} fill="currentColor" /> {hosp.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : currentView === 'profile' ? (
                <>
                  <div className="dashboard-content-header" style={{ marginBottom: '1.5rem' }}>
                    <h1 className="section-title">My Profile</h1>
                  </div>
                  <div className="profile-container" style={{ padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                      <div className="avatar" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                        {currentUser?.fullname?.split(' ').map(n => n[0]).join('') || 'S'}
                      </div>
                      <div>
                        <h2 style={{ margin: '0 0 0.5rem 0', color: '#0f172a' }}>{currentUser?.fullname || 'Sewa'}</h2>
                        <p style={{ margin: 0, color: '#64748b' }}>{currentUser?.email || 'sewa@example.com'}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }} onClick={() => showToast('Personal details functionality pending...', 'success')}>Personal Details</button>
                      <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }} onClick={() => showToast('Payment methods functionality pending...', 'success')}>Payment Methods</button>
                      <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }} onClick={() => showToast('Medical history functionality pending...', 'success')}>Medical History</button>
                      <button className="btn btn-secondary" style={{ justifyContent: 'flex-start', color: '#dc2626', borderColor: '#fca5a5' }} onClick={handleLogout}>Log Out</button>
                    </div>
                  </div>
                </>
              ) : null}
              </div>
            </div>

            {/* Desktop-only right sidebar panel */}
            <aside className="desktop-right-panel">
              <div className="right-panel-section">
                <h2 className="right-panel-title">Upcoming Appointment</h2>
                <div 
                  className="upcoming-appointment-card blue-card" 
                  onClick={() => {
                    const upcoming = userBookings.find(b => b.status === 'Scheduled' || b.status === 'Confirmed');
                    if (upcoming) {
                      setSelectedBookingDetail(upcoming);
                      setCurrentView('bookings');
                    } else {
                      showToast('No upcoming bookings yet. Book a new test!', 'success');
                    }
                  }}
                >
                  <div className="appointment-card-content">
                    <div className="appointment-icon-wrapper">
                      <Calendar size={20} color="#fff" />
                    </div>
                    <div className="appointment-text">
                      <h3>Malaria Test</h3>
                      <p>Intercontinental Specialist Laboratory</p>
                      <span className="appointment-time-capsule">
                        4, July, 2026 • 4:00 PM
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="appointment-chevron" size={20} />
                </div>
              </div>

              <div className="right-panel-section">
                <h2 className="right-panel-title">Book Again</h2>
                <div className="book-again-card">
                  <div className="book-again-info">
                    <div className="book-again-icon">
                      <Heart size={20} color="#ef4444" />
                    </div>
                    <div>
                      <h3>Heart beat test</h3>
                      <p>Evercare Hospital • ₦2,400</p>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => {
                    const testMatch = LAB_TESTS.find(t => t.id === 'lipid');
                    const hospital = testMatch?.hospitals.find(h => h.id === 'evercare');
                    if (testMatch && hospital) {
                      selectHospitalAndCompare(testMatch, hospital);
                    } else {
                      showToast('Proceeding to schedule Heart Beat Test...', 'success');
                    }
                  }}>
                    Book again
                  </button>
                </div>
              </div>
            </aside>



          </div>
        )}

        {/* 8. DIGITAL RESULTS VIEW SCREEN */}
        {currentScreen === 'results' && viewingResultBooking && (
          <div className="dashboard-layout animate-fade-in">
            
            {/* Left sidebar nav for desktop (>= 1024px) */}
            <aside className="desktop-sidebar">
              <div className="sidebar-brand" onClick={() => {
                setViewingResultBooking(null);
                setCurrentScreen('dashboard');
              }}>
                <Activity color="#4A80F5" size={24} />
                <span>ETC<span className="brand-dot">.</span><span style={{fontWeight: 400, fontSize: '0.9rem', color: '#64748b', marginLeft: '4px'}}>The Lab Test</span></span>
              </div>
              
              <div className="sidebar-links">
                <div className="sidebar-link" onClick={() => {
                  setViewingResultBooking(null);
                  setCurrentView('home');
                  setCurrentScreen('dashboard');
                }}>
                  <Home size={18} />
                  <span>Home</span>
                </div>
                <div className="sidebar-link" onClick={() => {
                  setViewingResultBooking(null);
                  setCurrentView('bookings');
                  setCurrentScreen('dashboard');
                }}>
                  <Calendar size={18} />
                  <span>Bookings</span>
                </div>
                <div className="sidebar-link" onClick={() => {
                  setViewingResultBooking(null);
                  setCurrentView('home');
                  setCurrentScreen('dashboard');
                  setTimeout(() => {
                    const el = document.getElementById('search-catalog-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}>
                  <Search size={18} />
                  <span>Find Tests</span>
                </div>
                <div className="sidebar-link active" onClick={() => {
                  // Keep on reports
                }}>
                  <Activity size={18} />
                  <span>Reports</span>
                </div>
              </div>

              <div className="sidebar-user-section">
                <div className="sidebar-user-info">
                  <span className="avatar">
                    {currentUser?.fullname?.split(' ').map(n => n[0]).join('') || 'S'}
                  </span>
                  <div className="user-details">
                    <div className="user-name">{currentUser?.fullname || 'Sewa'}</div>
                    <div className="user-email">{currentUser?.email || 'sewa@example.com'}</div>
                  </div>
                </div>
                <button className="btn btn-secondary btn-full btn-logout" onClick={() => {
                  setViewingResultBooking(null);
                  handleLogout();
                }}>
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </aside>

            {/* Main scrollable content */}
            <div className="dashboard-main-container" style={{overflowY: 'auto', height: '100vh'}}>
              <div className="dashboard-content-wrapper" style={{maxWidth: '900px', margin: '0 auto', paddingBottom: '5rem'}}>
                
                {/* Back button & Action Header */}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
                  <button className="btn btn-secondary" onClick={() => {
                    setViewingResultBooking(null);
                    setCurrentScreen('dashboard');
                  }}>
                    ← Back to dashboard
                  </button>

                  <button className="btn btn-primary" onClick={handlePrintDownload}>
                    <Download size={16}/> Download PDF Report
                  </button>
                </div>

                {/* Redesigned Premium Paper Report */}
                <div className="results-paper-wrapper">
                  <div className="results-paper-report">
                    <div className="report-watermark">ETC LABS</div>
                    
                    {/* Header with Lab Details */}
                    <div className="results-pdf-header-premium">
                      <div>
                        <h2>ETC DIAGNOSTIC LABS</h2>
                        <div className="lab-meta-info">
                          <span>ISO 15189 CERTIFIED CLINICAL PATHOLOGY</span><br />
                          <span>Lic. No: NHREC/2026/L-0892 • +234 801 234 5678</span><br />
                          <span>32 Corporate Drive, Victoria Island, Lagos</span>
                        </div>
                      </div>
                      <div className="report-tag-group">
                        <span className="home-status-badge completed" style={{backgroundColor: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd'}}>
                          OFFICIAL REPORT
                        </span>
                        <div style={{fontSize: '0.8rem', color: '#64748b', textAlign: 'right', marginTop: '0.25rem'}}>
                          <strong>Report Ref:</strong> {viewingResultBooking.id}<br />
                          <strong>Status:</strong> Released
                        </div>
                      </div>
                    </div>

                    {/* Patient and Sample Information Grid */}
                    <div className="results-grid-info-premium">
                      <div className="info-col-item">
                        <span className="info-label-premium">PATIENT NAME</span>
                        <span className="info-value-premium">{viewingResultBooking.patientName}</span>
                      </div>
                      <div className="info-col-item">
                        <span className="info-label-premium">TEST PROVIDER</span>
                        <span className="info-value-premium">{viewingResultBooking.hospitalName}</span>
                      </div>
                      <div className="info-col-item">
                        <span className="info-label-premium">EXTRACTION DATE</span>
                        <span className="info-value-premium">{viewingResultBooking.appointmentDate} • {viewingResultBooking.appointmentTime}</span>
                      </div>
                    </div>

                    <h3 style={{fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem'}}>
                      Test Analysis: {viewingResultBooking.testName} ({viewingResultBooking.testCode})
                    </h3>

                    {/* Structured Parameters Table */}
                    <div className="results-table-wrapper">
                      <table className="results-table-premium">
                        <thead>
                          <tr>
                            <th>Test Parameter</th>
                            <th>Measured Value</th>
                            <th>Reference Interval</th>
                            <th>Status</th>
                            <th>Analytical Gauge</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewingResultBooking.testCode === 'LIP-09' ? (
                            <>
                              <tr>
                                <td><strong>Total Cholesterol</strong></td>
                                <td style={{fontWeight: 700, color: '#dc2626'}}>240 mg/dL</td>
                                <td style={{color: '#64748b'}}>&lt; 200 mg/dL</td>
                                <td><span className="result-flag-badge high">HIGH</span></td>
                                <td>
                                  <div className="gauge-visual-container">
                                    <div className="gauge-labels-row">
                                      <span>L</span>
                                      <span>N</span>
                                      <span>H</span>
                                    </div>
                                    <div className="gauge-gradient-bar">
                                      <div className="gauge-indicator-caret-pin" style={{left: '80%'}}>
                                        <div className="gauge-indicator-dot"></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td><strong>HDL Cholesterol</strong></td>
                                <td style={{fontWeight: 700, color: '#059669'}}>45 mg/dL</td>
                                <td style={{color: '#64748b'}}>&gt; 40 mg/dL</td>
                                <td><span className="result-flag-badge normal">NORMAL</span></td>
                                <td>
                                  <div className="gauge-visual-container">
                                    <div className="gauge-labels-row">
                                      <span>L</span>
                                      <span>N</span>
                                      <span>H</span>
                                    </div>
                                    <div className="gauge-gradient-bar">
                                      <div className="gauge-indicator-caret-pin" style={{left: '52%'}}>
                                        <div className="gauge-indicator-dot"></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td><strong>LDL Cholesterol</strong></td>
                                <td style={{fontWeight: 700, color: '#dc2626'}}>165 mg/dL</td>
                                <td style={{color: '#64748b'}}>&lt; 100 mg/dL</td>
                                <td><span className="result-flag-badge high">HIGH</span></td>
                                <td>
                                  <div className="gauge-visual-container">
                                    <div className="gauge-labels-row">
                                      <span>L</span>
                                      <span>N</span>
                                      <span>H</span>
                                    </div>
                                    <div className="gauge-gradient-bar">
                                      <div className="gauge-indicator-caret-pin" style={{left: '85%'}}>
                                        <div className="gauge-indicator-dot"></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ) : viewingResultBooking.testCode === 'DIA-04' ? (
                            <>
                              <tr>
                                <td><strong>HbA1c</strong></td>
                                <td style={{fontWeight: 700, color: '#059669'}}>5.4%</td>
                                <td style={{color: '#64748b'}}>4.0% - 5.6% (Non-Diabetic)</td>
                                <td><span className="result-flag-badge normal">NORMAL</span></td>
                                <td>
                                  <div className="gauge-visual-container">
                                    <div className="gauge-labels-row">
                                      <span>L</span>
                                      <span>N</span>
                                      <span>H</span>
                                    </div>
                                    <div className="gauge-gradient-bar">
                                      <div className="gauge-indicator-caret-pin" style={{left: '48%'}}>
                                        <div className="gauge-indicator-dot"></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td><strong>Estimated Average Glucose</strong></td>
                                <td style={{fontWeight: 700, color: '#059669'}}>108 mg/dL</td>
                                <td style={{color: '#64748b'}}>70 - 126 mg/dL</td>
                                <td><span className="result-flag-badge normal">NORMAL</span></td>
                                <td>
                                  <div className="gauge-visual-container">
                                    <div className="gauge-labels-row">
                                      <span>L</span>
                                      <span>N</span>
                                      <span>H</span>
                                    </div>
                                    <div className="gauge-gradient-bar">
                                      <div className="gauge-indicator-caret-pin" style={{left: '52%'}}>
                                        <div className="gauge-indicator-dot"></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          ) : (
                            <>
                              <tr>
                                <td><strong>Diagnostic Parameter</strong></td>
                                <td style={{fontWeight: 700, color: '#059669'}}>Trace Levels Detectable</td>
                                <td style={{color: '#64748b'}}>Negative / Non-Reactive</td>
                                <td><span className="result-flag-badge normal">NORMAL</span></td>
                                <td>
                                  <div className="gauge-visual-container">
                                    <div className="gauge-labels-row">
                                      <span>L</span>
                                      <span>N</span>
                                      <span>H</span>
                                    </div>
                                    <div className="gauge-gradient-bar">
                                      <div className="gauge-indicator-caret-pin" style={{left: '20%'}}>
                                        <div className="gauge-indicator-dot"></div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Clinical Note Box */}
                    <div style={{
                      display: 'flex', 
                      gap: '0.75rem', 
                      backgroundColor: 'hsl(var(--neutral-50))', 
                      padding: '1.25rem', 
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.85rem',
                      color: 'hsl(var(--neutral-600))',
                      lineHeight: '1.5',
                      marginBottom: '2rem'
                    }}>
                      <Info size={18} style={{flexShrink: 0, color: 'hsl(var(--primary))', marginTop: '0.1rem'}}/>
                      <div>
                        <strong>Clinical Interpretation Note:</strong><br />
                        {viewingResultBooking.testCode === 'LIP-09' ? 
                          'Elevated LDL and Total Cholesterol levels suggest cardiovascular risk. A diet low in saturated fats, daily moderate cardiovascular exercise, and follow-up medical consultation with a primary care practitioner are recommended.' : 
                          'Measured levels fall within the standard clinical reference intervals for healthy individuals. Continue routine annual screening and maintain a balanced diet and regular exercise.'
                        }
                      </div>
                    </div>

                    {/* Seals and Pathologist Signatures */}
                    <div className="seals-and-signatures-row">
                      <div className="accreditation-seals-box">
                        <div className="seal-item">
                          <Award size={18} color="#f59e0b" style={{flexShrink: 0}} />
                          <div>
                            <span className="seal-text-title">ISO 15189</span>
                            <span className="seal-text-subtitle">Pathology Accreditation</span>
                          </div>
                        </div>
                        <div className="seal-item">
                          <ShieldCheck size={18} color="#06b6d4" style={{flexShrink: 0}} />
                          <div>
                            <span className="seal-text-title">NHREC Certified</span>
                            <span className="seal-text-subtitle">Digital Signature Verified</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="signature-box">
                        <div className="mock-signature-img">Dr. K. Akinyemi</div>
                        <span className="signee-name">Dr. Kunle Akinyemi, FRCPath</span>
                        <span className="signee-title">Chief Consulting Pathologist</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* 6. CATEGORY DETAIL / HOSPITAL LIST VIEW */}
        {currentScreen === 'category-detail' && (
          <div className="category-detail-view animate-fade-in">
            <div className="category-detail-container">
              
              {/* Back Navigation & Header */}
              <div className="category-detail-header">
                <button 
                  className="btn btn-secondary back-btn" 
                  onClick={() => setCurrentScreen('dashboard')}
                >
                  &larr; Back to Dashboard
                </button>
                <h1 className="category-title">
                  {selectedCategory === 'antenatal' ? 'Prenatal' : (CATEGORIES_WITH_ICONS.find(c => c.id === selectedCategory)?.name || 'General health')}
                </h1>
              </div>

              {/* Split layout: List / Grid on left, informative panel on right */}
              <div className="split-panel-layout">
                
                {/* Left panel: Search, filters and hospital list */}
                <div className="left-panel">
                  
                  {/* Real-time Search input */}
                  <div className="category-search-section">
                    <div className="search-input-wrapper">
                      <Search className="search-icon-inside" size={18} />
                      <input 
                        type="text" 
                        className="form-input search-input-custom" 
                        placeholder="Search hospitals or labs..."
                        value={hospitalSearchQuery}
                        onChange={(e) => setHospitalSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Filter/Sort Pills */}
                  <div className="filter-pills-row">
                    <button 
                      className={`filter-pill ${activeFilter === 'nearest' ? 'active' : ''}`}
                      onClick={() => setActiveFilter(activeFilter === 'nearest' ? '' : 'nearest')}
                    >
                      Nearest
                    </button>
                    <button 
                      className={`filter-pill ${activeFilter === 'cheapest' ? 'active' : ''}`}
                      onClick={() => setActiveFilter(activeFilter === 'cheapest' ? '' : 'cheapest')}
                    >
                      Cheapest
                    </button>
                    <button 
                      className={`filter-pill ${activeFilter === 'rating' ? 'active' : ''}`}
                      onClick={() => setActiveFilter(activeFilter === 'rating' ? '' : 'rating')}
                    >
                      Highest rating
                    </button>
                    <button 
                      className={`filter-pill ${activeFilter === 'homeservice' ? 'active' : ''}`}
                      onClick={() => setActiveFilter(activeFilter === 'homeservice' ? '' : 'homeservice')}
                    >
                      Home service
                    </button>
                  </div>

                  {/* Hospital List Cards */}
                  <div className="hospital-list">
                    {getFilteredHospitals().length > 0 ? (
                      getFilteredHospitals().map((hosp) => (
                        <div 
                          key={hosp.id} 
                          className="hospital-card animate-scale-in"
                          onClick={() => openLabProfile(hosp, 'category-detail')}
                        >
                          <div className="hospital-card-content">
                            <div className="hospital-icon-box">
                              <MapPin size={20} color="hsl(var(--primary))" />
                            </div>
                            <div className="hospital-info">
                              <h3 className="hospital-name">{hosp.name}</h3>
                              <p className="hospital-location">{hosp.location}</p>
                              <div className="hospital-meta-row">
                                <span className="distance-badge">{hosp.distance} km</span>
                                <span className="rating-badge-inline">
                                  <Star size={12} fill="currentColor" /> {hosp.rating}
                                </span>
                                {hosp.homeService && (
                                  <span className="home-service-badge-inline">Home collection</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="hospital-price-section">
                            <span className="price-label">From</span>
                            <span className="price-value">₦{hosp.price.toLocaleString()}</span>
                            <button className="btn btn-primary btn-sm book-btn-card" onClick={(e) => {
                              e.stopPropagation();
                              openLabProfile(hosp, 'category-detail');
                            }}>Book Slot</button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-results-card">
                        <AlertTriangle size={24} color="hsl(var(--neutral-400))" />
                        <p>No laboratories or hospitals match your search/filter criteria.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right panel: Informational / Promo view for desktop split layout */}
                <div className="right-panel">
                  <div className="category-info-card">
                    <h3>
                      {selectedCategory === 'antenatal' ? 'Prenatal Care' : (CATEGORIES_WITH_ICONS.find(c => c.id === selectedCategory)?.name || 'General health')}
                    </h3>
                    <p className="category-desc">
                      {selectedCategory === 'antenatal' && 'Our prenatal care diagnostics cover essential screenings for maternal and fetal well-being, helping expectant mothers ensure a healthy pregnancy.'}
                      {selectedCategory === 'cardiac' && 'Keep track of your cardiovascular system with lipid panels and blood markers designed to monitor heart health and cholesterol levels.'}
                      {selectedCategory === 'hormones' && 'Monitor and balance thyroid, metabolic and reproductive hormones. Essential for checking fatigue, sleep cycles, and metabolic health.'}
                      {selectedCategory === 'infectious' && 'Rapid testing and detailed blood smears to quickly diagnose malaria, typhoid, viral markers, and active bacterial infections.'}
                      {(selectedCategory === 'all' || selectedCategory === 'wellness') && 'General health screenings cover fundamental checks, including liver function, kidney health, blood counts, and nutritional levels.'}
                    </p>
                    <div className="promo-badge">
                      <ShieldCheck size={16} /> Verified Partner Laboratories
                    </div>
                    <ul className="benefits-list">
                      <li>✓ Direct booking integration</li>
                      <li>✓ Real-time slot availability</li>
                      <li>✓ Secure digital result delivery</li>
                    </ul>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* 9. LAB PROFILE / DETAILS VIEW SCREEN */}
        {currentScreen === 'lab-profile' && selectedLabProfile && (
          <div className="lab-profile-view animate-fade-in">
            {/* Header */}
            <header className="profile-header">
              <button className="icon-btn-back" onClick={() => setCurrentScreen(previousScreen)}>
                <ArrowLeft size={24} />
              </button>
              <div className="profile-header-actions">
                <button className="icon-btn" onClick={() => showToast('Link copied to clipboard!', 'success')}>
                  <Share2 size={22} />
                </button>
                <button className="icon-btn" onClick={() => showToast('Options menu opened', 'success')}>
                  <MoreVertical size={22} />
                </button>
              </div>
            </header>

            {/* Cover Photo */}
            <div className="profile-cover">
              <div className="cover-illustration">
                <svg viewBox="0 0 800 300" className="hospital-svg">
                  <defs>
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#e0f2fe" />
                      <stop offset="100%" stopColor="#bae6fd" />
                    </linearGradient>
                    <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#f1f5f9" />
                    </linearGradient>
                    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <rect width="800" height="300" fill="url(#skyGrad)" />
                  <circle cx="700" cy="80" r="50" fill="#fef08a" opacity="0.6" />
                  <path d="M 120,80 Q 140,60 160,80 Q 180,70 190,80 Q 210,80 200,100 L 110,100 Z" fill="#ffffff" opacity="0.9" />
                  <path d="M 520,60 Q 535,45 550,60 Q 565,52 572,60 Q 588,60 580,75 L 512,75 Z" fill="#ffffff" opacity="0.7" />
                  <path d="M 0,220 L 100,180 L 220,220 L 350,170 L 500,220 L 800,190 L 800,300 L 0,300 Z" fill="#94a3b8" opacity="0.3" />
                  <rect x="180" y="140" width="440" height="120" rx="8" fill="#cbd5e1" />
                  <rect x="200" y="100" width="400" height="150" rx="8" fill="url(#buildingGrad)" />
                  <rect x="200" y="100" width="80" height="150" fill="#2563eb" rx="4" opacity="0.9" />
                  <rect x="235" y="125" width="10" height="30" fill="#ffffff" rx="2" />
                  <rect x="225" y="135" width="30" height="10" fill="#ffffff" rx="2" />
                  <rect x="300" y="120" width="50" height="35" rx="3" fill="url(#glassGrad)" />
                  <rect x="370" y="120" width="50" height="35" rx="3" fill="url(#glassGrad)" />
                  <rect x="440" y="120" width="50" height="35" rx="3" fill="url(#glassGrad)" />
                  <rect x="510" y="120" width="50" height="35" rx="3" fill="url(#glassGrad)" />
                  <rect x="300" y="175" width="50" height="35" rx="3" fill="url(#glassGrad)" />
                  <rect x="370" y="175" width="50" height="35" rx="3" fill="url(#glassGrad)" />
                  <rect x="440" y="175" width="50" height="35" rx="3" fill="url(#glassGrad)" />
                  <rect x="510" y="175" width="50" height="35" rx="3" fill="url(#glassGrad)" />
                  <rect y="240" width="800" height="60" fill="#64748b" />
                  <line x1="0" y1="270" x2="800" y2="270" stroke="#f8fafc" strokeWidth="4" strokeDasharray="30 20" />
                </svg>
              </div>
            </div>

            {/* Lab Overview Card */}
            <div className="lab-overview-card">
              <h1 className="lab-profile-name">{selectedLabProfile.name}</h1>
              <p className="lab-profile-location">
                <MapPin size={16} /> {selectedLabProfile.location}
              </p>
              <div className="lab-pills-row">
                <span className="lab-pill-badge">{selectedLabProfile.homeService ? 'Home service' : 'Walk-in service'}</span>
                <span className="lab-pill-badge">~ {selectedLabProfile.waitMinutes}mins wait</span>
                <span className="lab-pill-badge">{selectedLabProfile.distance} away</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid-container">
              <div className="stat-box">
                <span className="stat-value">
                  <Star size={16} fill="currentColor" /> {selectedLabProfile.rating}
                </span>
                <span className="stat-label">Ratings</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{selectedLabProfile.completedTestsCount}</span>
                <span className="stat-label">Completed test</span>
              </div>
              <div className="stat-box">
                <span className="stat-value">{selectedLabProfile.upcomingBookingsCount}</span>
                <span className="stat-label">Upcoming bookings</span>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="segmented-tab-switcher">
              <button 
                className={`tab-btn ${labProfileTab === 'about' ? 'active' : ''}`}
                onClick={() => setLabProfileTab('about')}
              >
                About lab
              </button>
              <button 
                className={`tab-btn ${labProfileTab === 'tests' ? 'active' : ''}`}
                onClick={() => setLabProfileTab('tests')}
              >
                Popular tests
              </button>
            </div>

            {/* Tab Contents */}
            <div className="profile-tab-content">
              {labProfileTab === 'about' && (
                <div className="about-tab-section animate-fade-in">
                  <h3 className="section-title">About lab</h3>
                  <p className="about-bio">{selectedLabProfile.bio}</p>
                  
                  <div className="details-list-icons">
                    <div className="detail-item-icon">
                      <Clock size={20} />
                      <div>
                        <h4>Business Hours</h4>
                        <p>{selectedLabProfile.hours}</p>
                      </div>
                    </div>
                    
                    <div className="detail-item-icon">
                      <Phone size={20} />
                      <div>
                        <h4>Phone Number</h4>
                        <p>{selectedLabProfile.phone}</p>
                      </div>
                    </div>
                    
                    <div className="detail-item-icon">
                      <Mail size={20} />
                      <div>
                        <h4>Email</h4>
                        <p>{selectedLabProfile.email}</p>
                      </div>
                    </div>
                    
                    <div className="detail-item-icon">
                      <Award size={20} />
                      <div>
                        <h4>Accreditation</h4>
                        <p>{selectedLabProfile.accreditation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {labProfileTab === 'tests' && (
                <div className="tests-tab-section animate-fade-in">
                  <h3 className="section-title">Popular tests</h3>
                  <div className="popular-tests-list">
                    {selectedLabProfile.popularTests.map((pt, idx) => (
                      <div key={idx} className="popular-test-row">
                        <div className="popular-test-info">
                          <h4>{pt.name}</h4>
                          <span className="popular-test-price">₦{pt.price.toLocaleString()}</span>
                        </div>
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleBookFromProfile(pt)}
                        >
                          Book
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="bottom-sticky-action-bar">
              <button 
                className={`btn-save-bookmark ${bookmarkedLabs.includes(selectedLabProfile.id) ? 'bookmarked' : ''}`}
                onClick={() => {
                  if (bookmarkedLabs.includes(selectedLabProfile.id)) {
                    setBookmarkedLabs(bookmarkedLabs.filter(id => id !== selectedLabProfile.id));
                    showToast('Removed from bookmarks', 'success');
                  } else {
                    setBookmarkedLabs([...bookmarkedLabs, selectedLabProfile.id]);
                    showToast('Saved to bookmarks!', 'success');
                  }
                }}
              >
                <Bookmark size={20} fill={bookmarkedLabs.includes(selectedLabProfile.id) ? "currentColor" : "none"} />
                <span>Save</span>
              </button>
              <button 
                className="btn btn-primary btn-book-appointment-sticky"
                onClick={handleBookMainFromProfile}
              >
                Book appointment
              </button>
            </div>
          </div>
        )}

        {/* Rebuilt 4-Step Booking Wizard Dialog */}
        {isBookingWizardActive && (
          <div className="modal-backdrop booking-wizard-backdrop">
            <div className="booking-wizard-card animate-scale-in">
              
              {/* Close Button & Header */}
              {paymentOutcome === null && (
                <div className="wizard-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {renderCircularProgress(bookingStep)}
                    <div>
                      <span className="wizard-step-tag">Booking Progress</span>
                      <h2 className="wizard-title">
                        {bookingStep === 1 && "Tell the doctor what's going on"}
                        {bookingStep === 2 && "Choose how you'd like your test"}
                        {bookingStep === 3 && "Confirm details"}
                        {bookingStep === 4 && "Payment details"}
                      </h2>
                    </div>
                  </div>
                  <button 
                    className="wizard-close-btn" 
                    onClick={() => {
                      setIsBookingWizardActive(false);
                      setBookingStep(1);
                      setSelectedSymptoms([]);
                      setAdditionalDetails('');
                      setAttachedFiles([]);
                    }}
                    title="Cancel Booking"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              {/* STEP 1: Tell the doctor what's going on */}
              {paymentOutcome === null && bookingStep === 1 && (
                <div className="wizard-step-content animate-fade-in">
                  
                  {/* Test Info Card */}
                  <div className="wizard-test-preview-card">
                    <div className="preview-label">Selected Test Package</div>
                    <div className="preview-main-info">
                      <div>
                        <h3>{selectedTest?.name || "Heart beat test"}</h3>
                        <p>{selectedHospital?.name || "Peak Diagnostic Laboratory"}</p>
                      </div>
                      <div className="preview-price">
                        ₦{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  {/* Symptoms multi-select */}
                  <div className="wizard-form-section">
                    <label className="form-label" style={{ fontWeight: 600 }}>What symptoms are you experiencing?</label>
                    <p className="form-sublabel">Select all that apply to help the laboratory report context</p>
                    <div className="symptoms-grid">
                      {['Nausea', 'Fever', 'Weight loss', 'Cough', 'Headache', 'Chest pain', 'Rashes', 'Others'].map((symptom) => {
                        const isActive = selectedSymptoms.includes(symptom);
                        return (
                          <button
                            key={symptom}
                            type="button"
                            className={`symptom-badge-pill ${isActive ? 'active' : ''}`}
                            onClick={() => toggleSymptom(symptom)}
                          >
                            {symptom}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Additional details */}
                  <div className="wizard-form-section">
                    <label className="form-label" style={{ fontWeight: 600 }}>Additional details (optional)</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Share anything else that might be helpful (e.g., allergies, current medications, pregnancy status)"
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Attach document */}
                  <div className="wizard-form-section">
                    <label className="form-label" style={{ fontWeight: 600 }}>Attach document / prescription (optional)</label>
                    <div className="file-upload-panel">
                      <input 
                        type="file" 
                        id="wizard-file-input" 
                        multiple 
                        style={{ display: 'none' }} 
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="wizard-file-input" className="file-upload-label">
                        <div className="upload-plus-circle">
                          <Plus size={24} />
                        </div>
                        <span>Upload medical files, referrals, or drug logs</span>
                      </label>
                    </div>

                    {attachedFiles.length > 0 && (
                      <div className="attached-files-list">
                        {attachedFiles.map((file, idx) => (
                          <div key={idx} className="attached-file-row animate-scale-in">
                            <div className="file-info">
                              <FileText size={16} color="#3b82f6" />
                              <span className="file-name">{file}</span>
                            </div>
                            <button 
                              type="button" 
                              className="file-remove-btn"
                              onClick={() => removeAttachedFile(file)}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Step 1 Actions */}
                  <div className="wizard-actions">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => {
                        setSelectedSymptoms([]);
                        setBookingStep(2);
                      }}
                    >
                      Skip for now
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => setBookingStep(2)}
                    >
                      Continue
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 2: Choose how you'd like your test */}
              {paymentOutcome === null && bookingStep === 2 && (
                <div className="wizard-step-content animate-fade-in">
                  
                  {/* Appointment type */}
                  <div className="wizard-form-section">
                    <label className="form-label" style={{ fontWeight: 600 }}>Select Appointment Method</label>
                    <div className="appointment-types-grid">
                      <div 
                        className={`appointment-type-card ${!homeCollection ? 'active' : ''}`}
                        onClick={() => setHomeCollection(false)}
                      >
                        <div className="card-selector-circle">
                          <div className="card-selector-dot"></div>
                        </div>
                        <div className="card-text-content">
                          <h4>Walk-in</h4>
                          <p>Visit our laboratory center directly</p>
                        </div>
                        <span className="type-price-addon">Free</span>
                      </div>

                      <div 
                        className={`appointment-type-card ${homeCollection ? 'active' : ''}`}
                        onClick={() => setHomeCollection(true)}
                      >
                        <div className="card-selector-circle">
                          <div className="card-selector-dot"></div>
                        </div>
                        <div className="card-text-content">
                          <h4>Home service</h4>
                          <p>A certified specialist comes to you</p>
                        </div>
                        <span className="type-price-addon">+₦3,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Pick a date calendar */}
                  <div className="wizard-form-section">
                    <label className="form-label" style={{ fontWeight: 600 }}>Pick a Date</label>
                    {renderCalendar()}
                    {selectedDate && (
                      <div className="selected-date-preview">
                        Selected Date: <strong>{selectedDate.fullDate}</strong>
                      </div>
                    )}
                  </div>

                  {/* Time slots */}
                  <div className="wizard-form-section">
                    <label className="form-label" style={{ fontWeight: 600 }}>Available Time Slots</label>
                    <div className="horizontal-slots-container">
                      {['08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'].map((slot) => {
                        const isActive = selectedTimeSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            className={`slot-pill ${isActive ? 'active' : ''}`}
                            onClick={() => setSelectedTimeSlot(slot)}
                          >
                            <Clock size={14} style={{ marginRight: '4px' }} />
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="wizard-actions">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setBookingStep(1)}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => {
                        if (!selectedDate) {
                          showToast('Please select an appointment date from the calendar.', 'success');
                          return;
                        }
                        setBookingStep(3);
                      }}
                    >
                      Continue
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 3: Confirm details */}
              {paymentOutcome === null && bookingStep === 3 && (
                <div className="wizard-step-content animate-fade-in">
                  
                  <div className="confirmation-grid-wrapper">
                    <h3 className="section-title" style={{ marginBottom: '1.25rem' }}>Review Appointment Booking</h3>
                    
                    <div className="confirmation-grid">
                      <div className="confirmation-item">
                        <div className="confirm-val">{selectedHospital?.name || "Peak Diagnostic Laboratory"}</div>
                        <div className="confirm-lbl">Laboratory</div>
                      </div>

                      <div className="confirmation-item">
                        <div className="confirm-val">{selectedTest?.name || "Heart beat test"}</div>
                        <div className="confirm-lbl">Test category</div>
                      </div>

                      <div className="confirmation-item">
                        <div className="confirm-val">
                          {selectedDate?.fullDate} • {selectedTimeSlot}
                        </div>
                        <div className="confirm-lbl">Date & time</div>
                      </div>

                      <div className="confirmation-item">
                        <div className="confirm-val">{homeCollection ? "Home service" : "Walk-in"}</div>
                        <div className="confirm-lbl">Appointment type</div>
                      </div>
                    </div>

                    <div className="confirmation-pricing-summary">
                      <div className="pricing-row">
                        <span>Base Test Price</span>
                        <span>₦{selectedHospital?.price.toLocaleString()}</span>
                      </div>
                      {homeCollection && (
                        <div className="pricing-row">
                          <span>Home Service Fee</span>
                          <span>+₦3,000</span>
                        </div>
                      )}
                      <div className="pricing-divider"></div>
                      <div className="pricing-row grand-total">
                        <span>Total Price</span>
                        <span>₦{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 Actions */}
                  <div className="wizard-actions">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setBookingStep(2)}
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => setBookingStep(4)}
                    >
                      Proceed to pay
                    </button>
                  </div>

                </div>
              )}

              {/* STEP 4: Payment details */}
              {paymentOutcome === null && bookingStep === 4 && (
                <div className="wizard-step-content animate-fade-in">
                  
                  {/* Total Payment Banner */}
                  <div className="checkout-summary-banner">
                    <span>Grand Total:</span>
                    <strong>₦{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                  </div>

                  {/* Tab Switcher */}
                  <div className="payment-tabs-bar">
                    <button 
                      type="button" 
                      className={`payment-tab-item ${paymentTab === 'transfer' ? 'active' : ''}`}
                      onClick={() => setPaymentTab('transfer')}
                    >
                      Bank transfer
                    </button>
                    <button 
                      type="button" 
                      className={`payment-tab-item ${paymentTab === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentTab('card')}
                    >
                      Card
                    </button>
                    <button 
                      type="button" 
                      className={`payment-tab-item ${paymentTab === 'pay-at-lab' ? 'active' : ''}`}
                      onClick={() => setPaymentTab('pay-at-lab')}
                    >
                      Pay at lab
                    </button>
                  </div>

                  {/* Tab Contents: Card */}
                  {paymentTab === 'card' && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setCardError('');
                      if (!patientFirstName.trim() || !patientLastName.trim()) {
                        setCardError('First and Last names are required');
                        return;
                      }
                      if (patientDetails.cardNumber.replace(/\s+/g, '').length < 16) {
                        setCardError('Please enter a valid 16-digit card number.');
                        return;
                      }
                      if (patientDetails.cardExpiry.length < 5) {
                        setCardError('Please enter card expiry date (MM/YY).');
                        return;
                      }
                      if (patientDetails.cardCVV.length < 3) {
                        setCardError('Please enter CVV.');
                        return;
                      }

                      setIsSimulatingPayment(true);
                      setTimeout(() => {
                        setIsSimulatingPayment(false);
                        const isInsufficient = patientDetails.cardNumber.startsWith('5555');
                        
                        // Register booking on success
                        if (!isInsufficient) {
                          const newBooking = {
                            id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
                            testName: selectedTest?.name || 'Heart beat test',
                            testCode: selectedTest?.code || 'POP-99',
                            hospitalName: selectedHospital?.name || 'Peak Diagnostic Laboratory',
                            appointmentDate: selectedDate ? selectedDate.fullDate : new Date().toDateString(),
                            appointmentTime: selectedTimeSlot,
                            patientName: `${patientFirstName} ${patientLastName}`,
                            patientPhone: patientDetails.phone,
                            collectionMethod: homeCollection ? 'Home Collection' : 'Walk-in Clinic',
                            totalPaid: totalAmount,
                            status: 'Scheduled',
                            createdAt: new Date().toLocaleDateString()
                          };
                          const updated = [newBooking, ...userBookings];
                          setUserBookings(updated);
                          localStorage.setItem(`bookings_${currentUser?.email || 'guest'}`, JSON.stringify(updated));
                        }

                        setPaymentOutcome(isInsufficient ? 'insufficient' : 'success');
                      }, 1200);
                    }}>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">First Name</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="e.g. Tunde"
                            value={patientFirstName}
                            onChange={(e) => setPatientFirstName(e.target.value)}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Last Name</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="e.g. Alao"
                            value={patientLastName}
                            onChange={(e) => setPatientLastName(e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Contact Number</label>
                        <div className="phone-input-wrapper">
                          <span className="phone-country-flag">🇳🇬 +234</span>
                          <input 
                            type="tel" 
                            className="form-input phone-input-field" 
                            placeholder="801 234 5678"
                            value={patientDetails.phone}
                            onChange={(e) => setPatientDetails({...patientDetails, phone: e.target.value.replace(/[^0-9]/g, '')})}
                            required 
                          />
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <div className="card-input-wrapper">
                          <input 
                            type="text" 
                            className="form-input card-num-input" 
                            placeholder="0000 0000 0000 0000" 
                            value={patientDetails.cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength={19}
                            required 
                          />
                          <div className="card-brand-icons">
                            <span className={`brand-card-logo visa ${patientDetails.cardNumber.startsWith('4') ? 'highlight' : ''}`}>Visa</span>
                            <span className={`brand-card-logo mastercard ${patientDetails.cardNumber.startsWith('5') ? 'highlight' : ''}`}>MC</span>
                          </div>
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Expiry Date</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="MM/YY" 
                            value={patientDetails.cardExpiry}
                            onChange={handleExpiryChange}
                            maxLength={5}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">CVV</label>
                          <input 
                            type="password" 
                            className="form-input" 
                            placeholder="•••" 
                            value={patientDetails.cardCVV}
                            onChange={(e) => setPatientDetails({...patientDetails, cardCVV: e.target.value.replace(/[^0-9]/g, '').substring(0,3)})}
                            maxLength={3}
                            required 
                          />
                        </div>
                      </div>

                      {cardError && <div className="form-error" style={{ marginBottom: '1rem' }}><AlertTriangle size={14}/>{cardError}</div>}

                      <button type="submit" className="btn btn-primary btn-full" disabled={isSimulatingPayment}>
                        {isSimulatingPayment ? 'Connecting to Bank secure servers...' : `Pay ₦${totalAmount.toLocaleString()}`}
                      </button>
                    </form>
                  )}

                  {/* Tab Contents: Bank Transfer */}
                  {paymentTab === 'transfer' && (
                    <div className="bank-transfer-view">
                      <p className="transfer-instruction">Make a transfer to the account below</p>
                      
                      <div className="bank-details-card">
                        <div className="bank-detail-row">
                          <span className="lbl">Bank</span>
                          <span className="val font-semibold">Sterling Bank</span>
                        </div>
                        
                        <div className="bank-detail-row">
                          <span className="lbl">Account name</span>
                          <span className="val font-semibold">ETC Diagnostics</span>
                        </div>
                        
                        <div className="bank-detail-row">
                          <span className="lbl">Amount</span>
                          <span className="val font-bold text-blue">
                            ₦{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            <button 
                              type="button" 
                              className="inline-copy-btn"
                              onClick={() => handleCopyText(totalAmount.toString(), 'amount')}
                              title="Copy Amount"
                            >
                              <Copy size={14} />
                              {copiedValue === 'amount' && <span className="copy-feedback-toast">Copied!</span>}
                            </button>
                          </span>
                        </div>

                        <div className="bank-detail-row">
                          <span className="lbl">Account no.</span>
                          <span className="val font-bold text-blue">
                            0012345678
                            <button 
                              type="button" 
                              className="inline-copy-btn"
                              onClick={() => handleCopyText('0012345678', 'account')}
                              title="Copy Account Number"
                            >
                              <Copy size={14} />
                              {copiedValue === 'account' && <span className="copy-feedback-toast">Copied!</span>}
                            </button>
                          </span>
                        </div>
                      </div>

                      {/* Yellow alert banner */}
                      <div className="yellow-timer-banner">
                        <AlertTriangle size={16} />
                        <span>Use this account for this transaction only. It will expire in <strong style={{ fontFamily: 'monospace' }}>{formatBankTimer(bankTimer)}</strong></span>
                      </div>

                      <button 
                        type="button" 
                        className="btn btn-primary btn-full"
                        onClick={() => {
                          // Simulation: Bank transfer always triggers Insufficient balance for testing
                          setPaymentOutcome('insufficient');
                        }}
                      >
                        I have paid
                      </button>
                    </div>
                  )}

                  {/* Tab Contents: Pay at Lab */}
                  {paymentTab === 'pay-at-lab' && (
                    <div className="pay-at-lab-view">
                      <div className="pay-at-lab-info-card">
                        <Info size={24} color="#3b82f6" />
                        <div>
                          <h4>Pay at Laboratory Reception</h4>
                          <p>You can pay via Cash, POS, or Mobile Transfer when you arrive at the reception desk for your appointment.</p>
                        </div>
                      </div>
                      
                      <button 
                        type="button" 
                        className="btn btn-primary btn-full"
                        onClick={() => {
                          const newBooking = {
                            id: 'BK-' + Math.floor(100000 + Math.random() * 900000),
                            testName: selectedTest?.name || 'Heart beat test',
                            testCode: selectedTest?.code || 'POP-99',
                            hospitalName: selectedHospital?.name || 'Peak Diagnostic Laboratory',
                            appointmentDate: selectedDate ? selectedDate.fullDate : new Date().toDateString(),
                            appointmentTime: selectedTimeSlot,
                            patientName: currentUser?.fullname || 'Guest Patient',
                            patientPhone: patientDetails.phone || '08012345678',
                            collectionMethod: homeCollection ? 'Home Collection' : 'Walk-in Clinic',
                            totalPaid: totalAmount,
                            status: 'Scheduled',
                            createdAt: new Date().toLocaleDateString()
                          };
                          const updated = [newBooking, ...userBookings];
                          setUserBookings(updated);
                          localStorage.setItem(`bookings_${currentUser?.email || 'guest'}`, JSON.stringify(updated));

                          setPaymentOutcome('success');
                        }}
                      >
                        Confirm booking
                      </button>
                    </div>
                  )}

                  {/* Step 4 Actions */}
                  <div className="wizard-actions" style={{ marginTop: '1.5rem' }}>
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => setBookingStep(3)}
                    >
                      Back
                    </button>
                  </div>

                </div>
              )}

            </div>

            {/* STEP 5: Payment Outcome Overlays */}
            {paymentOutcome !== null && (
              <div className="payment-outcome-backdrop animate-fade-in">
                
                {/* 5A: PAYMENT SUCCESSFUL */}
                {paymentOutcome === 'success' && (
                  <div className="outcome-card success animate-scale-in">
                    <div className="success-confetti-circle">
                      <div className="checkmark-anim-wrapper">
                        <CheckCircle size={80} color="#10b981" fill="#ecfdf5" className="checkmark-pulse" />
                      </div>
                    </div>
                    
                    <h2 className="outcome-title">Payment Successful! 🎉</h2>
                    <p className="outcome-desc">Your laboratory test slot has been reserved and confirmed.</p>

                    <div className="outcome-details-grid">
                      <div className="outcome-detail-row">
                        <span className="lbl">Laboratory</span>
                        <span className="val">{selectedHospital?.name || "Peak Diagnostic Laboratory"}</span>
                      </div>
                      <div className="outcome-detail-row">
                        <span className="lbl">Test category</span>
                        <span className="val">{selectedTest?.name || "Heart beat test"}</span>
                      </div>
                      <div className="outcome-detail-row">
                        <span className="lbl">Date & Time</span>
                        <span className="val">{selectedDate?.fullDate} • {selectedTimeSlot}</span>
                      </div>
                      <div className="outcome-detail-row">
                        <span className="lbl">Patient Name</span>
                        <span className="val">{patientFirstName && patientLastName ? `${patientFirstName} ${patientLastName}` : (currentUser?.fullname || "Patient")}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '2rem' }}>
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-full"
                        onClick={() => {
                          setIsBookingWizardActive(false);
                          setBookingStep(1);
                          setPaymentOutcome(null);
                          setSelectedSymptoms([]);
                          setAdditionalDetails('');
                          setAttachedFiles([]);
                          setCurrentScreen('dashboard');
                          setCurrentView('home');
                        }}
                      >
                        Back home
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-primary btn-full"
                        onClick={() => {
                          setIsBookingWizardActive(false);
                          setBookingStep(1);
                          setPaymentOutcome(null);
                          setSelectedSymptoms([]);
                          setAdditionalDetails('');
                          setAttachedFiles([]);
                          setCurrentScreen('dashboard');
                          setCurrentView('bookings');
                          setBookingFilterTab('Upcoming');
                        }}
                      >
                        View booking
                      </button>
                    </div>
                  </div>
                )}

                {/* 5B: INSUFFICIENT BALANCE */}
                {paymentOutcome === 'insufficient' && (
                  <div className="outcome-card failure animate-scale-in">
                    <div className="insufficient-coins-container">
                      <div className="gold-coins-stack">
                        <Coins size={60} color="#f59e0b" fill="#fef3c7" />
                        <div className="red-x-overlay">
                          <X size={28} color="#ffffff" strokeWidth={3} />
                        </div>
                      </div>
                    </div>

                    <h2 className="outcome-title">Insufficient balance</h2>
                    <p className="outcome-desc text-danger">
                      Your account does not have sufficient balance to complete this transaction.
                    </p>

                    <div style={{ width: '100%', marginTop: '2.5rem' }}>
                      <button 
                        type="button" 
                        className="btn btn-primary btn-full"
                        onClick={() => {
                          setPaymentOutcome(null); // takes user back to Step 4
                        }}
                      >
                        Retry payment
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}
      </main>

      {/* Booking Reschedule Modal */}
      {showRescheduleModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-scale-up" style={{ maxWidth: '400px' }}>
            <div className="modal-header-row">
              <h3>Reschedule Appointment</h3>
              <button className="modal-close-btn" onClick={() => setShowRescheduleModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p className="reschedule-desc">Select a new date and time for your appointment:</p>
              
              {/* Date Selector */}
              <div className="reschedule-date-selector">
                <label className="form-label">Available Dates</label>
                <div className="date-pills-scroll">
                  {getNextDates().map((d, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`date-pill-btn ${selectedDate?.dateString === d.dateString ? 'active' : ''}`}
                      onClick={() => setSelectedDate(d)}
                    >
                      <span className="day-name">{d.dayName}</span>
                      <span className="day-num">{d.dayNum}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Time Selector */}
              <div className="reschedule-time-selector" style={{ marginTop: '1.5rem' }}>
                <label className="form-label">Available Time Slots</label>
                <div className="time-slots-grid">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`time-slot-btn ${selectedTimeSlot === slot ? 'active' : ''}`}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer" style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button className="btn btn-secondary btn-full" onClick={() => setShowRescheduleModal(false)}>Cancel</button>
              <button 
                className="btn btn-primary btn-full" 
                onClick={() => {
                  const newDateStr = selectedDate ? selectedDate.fullDate : new Date().toDateString();
                  handleConfirmReschedule(newDateStr, selectedTimeSlot);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-scale-up cancel-confirm-modal" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div className="cancel-icon-wrapper-large">
              <X size={48} color="#ef4444" />
            </div>
            <h3 className="modal-title-bold">Are you sure you want to cancel?</h3>
            <p className="modal-text-desc">Please note that payment will not be refunded.</p>
            
            <div className="modal-vertical-actions">
              <button className="btn btn-danger btn-full" onClick={() => {
                setShowCancelConfirmModal(false);
                setShowCancelReasonModal(true);
              }}>
                Cancel booking
              </button>
              <button className="btn btn-secondary btn-full" onClick={() => {
                setShowCancelConfirmModal(false);
                const dates = getNextDates();
                setSelectedDate(dates[0]);
                setShowRescheduleModal(true);
              }}>
                Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Reason Questionnaire Modal */}
      {showCancelReasonModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-scale-up cancel-reason-modal" style={{ maxWidth: '420px' }}>
            <div className="modal-header-row">
              <h3>Why are you cancelling?</h3>
              <button className="modal-close-btn" onClick={() => setShowCancelReasonModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <div className="cancel-radio-group">
                {[
                  "I'm no longer interested",
                  "I just don't like them",
                  "Scam or illegal activities",
                  "I got busy",
                  "Others"
                ].map((option) => (
                  <label key={option} className="cancel-radio-label">
                    <input 
                      type="radio" 
                      name="cancelReason" 
                      value={option} 
                      checked={cancelReason === option}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              
              <div className="comment-textarea-wrapper" style={{ marginTop: '1rem' }}>
                <label className="form-label">Add a comment (optional)</label>
                <textarea 
                  className="form-input text-area-custom" 
                  placeholder="Tell us more..." 
                  rows="3"
                  value={cancelComments}
                  onChange={(e) => setCancelComments(e.target.value)}
                />
              </div>
              
              <div className="anonymous-alert-text">
                <Info size={16} style={{ minWidth: '16px' }} />
                <span>Your submission is anonymous</span>
              </div>
            </div>
            <div className="modal-footer" style={{ marginTop: '1.5rem' }}>
              <button 
                className="btn btn-primary btn-full"
                disabled={!cancelReason}
                onClick={handleCancelSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rate Past Appointment Feedback Modal */}
      {showRateFeedbackModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-scale-up rate-feedback-modal" style={{ maxWidth: '420px', textAlign: 'center' }}>
            <div className="modal-header-row" style={{ justifyContent: 'flex-end', borderBottom: 'none', padding: 0 }}>
              <button className="modal-close-btn" onClick={() => setShowRateFeedbackModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div className="thumbs-up-wrapper">
              <div className="thumbs-up-circle">
                <ThumbsUp size={36} color="#3b82f6" fill="#3b82f6" />
              </div>
            </div>
            
            <h3 className="modal-title-bold" style={{ marginTop: '1rem' }}>Rate Appointment</h3>
            <p className="modal-text-desc" style={{ marginBottom: '1.5rem' }}>How was your appointment experience?</p>
            
            {/* Stars */}
            <div className="interactive-stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  type="button" 
                  key={star} 
                  className="star-btn"
                  onClick={() => setFeedbackRating(star)}
                >
                  <Star 
                    size={32} 
                    fill={feedbackRating >= star ? '#f59e0b' : 'none'} 
                    color={feedbackRating >= star ? '#f59e0b' : '#cbd5e1'} 
                  />
                </button>
              ))}
            </div>
            
            {/* Tags */}
            <div className="feedback-tags-section" style={{ marginTop: '1.5rem', textAlign: 'left' }}>
              <label className="form-label">What went well?</label>
              <div className="feedback-tags-flex">
                {['Communication', 'Hygiene', 'Polite', 'Customer service', 'Friendly', 'Helpful'].map((tag) => {
                  const isSelected = feedbackTags.includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      className={`feedback-tag-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        if (isSelected) {
                          setFeedbackTags(prev => prev.filter(t => t !== tag));
                        } else {
                          setFeedbackTags(prev => [...prev, tag]);
                        }
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Comments */}
            <div className="feedback-comments-section" style={{ marginTop: '1.5rem', textAlign: 'left' }}>
              <label className="form-label">Add a comment (optional)</label>
              <textarea 
                className="form-input text-area-custom" 
                placeholder="Share details of your experience..." 
                rows="3"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>
            
            <button 
              className="btn btn-primary btn-full" 
              style={{ marginTop: '1.5rem' }}
              disabled={feedbackRating === 0}
              onClick={() => {
                showToast('Thank you for your feedback!', 'success');
                setShowRateFeedbackModal(false);
                setFeedbackRating(0);
                setFeedbackTags([]);
                setFeedbackText('');
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <footer style={{
        backgroundColor: 'var(--bg-card)', 
        borderTop: '1px solid var(--border-color)', 
        padding: '2rem', 
        textAlign: 'center', 
        fontSize: '0.85rem', 
        color: 'hsl(var(--neutral-500))'
      }}>
        <p>© 2026 ETC Diagnostics - The Lab Test Demo. All rights reserved.</p>
      </footer>

      {toastMessage && (
        <div className={`premium-toast toast-${toastMessage.type} animate-slide-up`}>
          {toastMessage.type === 'success' ? <CheckCircle size={20} /> : <Info size={20} />}
          <span>{toastMessage.msg}</span>
        </div>
      )}
    </div>
  );
}

export default App;
