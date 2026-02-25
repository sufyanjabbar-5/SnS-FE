import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { CartProvider } from "./context/CartContext";
import { CertificationProvider, useCertifications } from "./context/CertificationContext";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ScrollToHash from "./components/ScrollToHash/ScrollToHash";
import PublicLayout from "./layouts/PublicLayout/PublicLayout.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import "./App.css";
const PMPCertification = lazy(() => import("./pages/PMPCertification/PMPCertification.tsx"));
const Home = lazy(() => import("./pages/Home/Home.tsx"));
const LiveVirtualClasses = lazy(() => import("./pages/LiveVirtualClasses/LiveVirtualClasses"));

// Lazy load page components for better performance

const Checkout = lazy(() => import("./pages/Checkout/Checkout.tsx"));
const Cart = lazy(() => import("./pages/Cart/Cart.tsx"));
const ContactUs = lazy(() => import("./pages/Contact/ContactUs.tsx"));
const About = lazy(() => import("./pages/About/About.tsx"));
const Login = lazy(() => import("./pages/Login/Login.tsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword/ForgotPassword.tsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword/ResetPassword.tsx"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout/AdminLayout.tsx"));
const StudentLayout = lazy(() =>
  import("./layouts/StudentLayout/StudentLayout.tsx")
);
const AdminDashboard = lazy(() =>
  import("./pages/Admin/Dashboard/AdminDashboard.jsx")
);
const AdminCertifications = lazy(() => import("./pages/Admin/Certifications/AdminCertifications.jsx"));
const AdminEnrollments = lazy(() =>
  import("./pages/Admin/Enrollments/AdminEnrollments.jsx")
);
const AdminUsers = lazy(() => import("./pages/Admin/Users/AdminUsers.jsx"));
const AdminSettings = lazy(() =>
  import("./pages/Admin/Settings/AdminSettings.jsx")
);
const ChatLeads = lazy(() => import("./pages/Admin/ChatLeads/ChatLeads.jsx"));
const AdminLibrary = lazy(() => import("./pages/Admin/Library/AdminLibrary.jsx"));
const QuizQuestions = lazy(() => import("./pages/Admin/Library/QuizQuestions.jsx"));
const StudentDashboard = lazy(() =>
  import("./pages/Student/Dashboard/StudentDashboard.jsx")
);
const StudentEnrollments = lazy(() =>
  import("./pages/Student/Enrollments/StudentEnrollments.jsx")
);
const StudentCertificates = lazy(() =>
  import("./pages/Student/Certifications/StudentCertificates.jsx")
);
const StudentProfile = lazy(() =>
  import("./pages/Student/Profile/StudentProfile.jsx")
);
const StudentLibrary = lazy(() =>
  import("./pages/Student/Library/StudentLibrary.jsx")
);
const TakeQuiz = lazy(() => import("./pages/Student/Library/TakeQuiz.jsx"));
const Element = lazy(() =>
  import("./pages/Admin/Element/Element.tsx").then((module) => ({
    default: module.Element,
  }))
);
const PaymentSuccess = lazy(() => import("./pages/Payment/PaymentSuccess.tsx"));
const PaymentCancel = lazy(() => import("./pages/Payment/PaymentCancel.tsx"));
const SelfStudyBundle = lazy(() => import("./pages/SelfStudyBundle/SelfStudyBundle.tsx"));
const OneOnOneTraining = lazy(() => import("./pages/OneOnOneTraining/OneOnOneTraining.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy.tsx"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions/TermsAndConditions.tsx"));

// Loading spinner for lazy loaded components
const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <div className="loading-content">
      <div className="loading-logo">
        <img src="/logo.png" alt="Loading..." />
      </div>
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
      <p className="loading-text">Preparing your professional journey...</p>
    </div>
  </div>
);

function AppContent() {
  const { appInfo: settings, loading } = useCertifications();

  useEffect(() => {
    // Update browser title when settings change
    if (settings && settings.siteName) {
      document.title = settings.siteName;
    }
  }, [settings?.siteName]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <ScrollToHash />
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />
            <Route
              path="/checkout"
              element={
                <PublicLayout>
                  <Checkout />
                </PublicLayout>
              }
            />
            <Route
              path="/cart"
              element={
                <PublicLayout>
                  <Cart />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <ContactUs />
                </PublicLayout>
              }
            />
            <Route
              path="/pmp-certification"
              element={
                <PublicLayout>
                  <PMPCertification />
                </PublicLayout>
              }
            />
            <Route
              path="/one-on-one-training"
              element={
                <PublicLayout>
                  <OneOnOneTraining />
                </PublicLayout>
              }
            />
  <Route
              path="/live-bootcamp/:courseSlug"
              element={
                <PublicLayout>
                  <LiveVirtualClasses />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <About />
                </PublicLayout>
              }
            />
            <Route
              path="/corporate-training"
              element={
                <PublicLayout>
                  <CorporateTraining />
                </PublicLayout>
              }
            />
            <Route
              path="/self-study-bundle"
              element={
                <PublicLayout>
                  <SelfStudyBundle />
                </PublicLayout>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PublicLayout>
                  <PrivacyPolicy />
                </PublicLayout>
              }
            />
            <Route
              path="/terms-and-conditions"
              element={
                <PublicLayout>
                  <TermsAndConditions />
                </PublicLayout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="/admin/dashboard" replace />}
              />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="certifications" element={<AdminCertifications />} />
              <Route path="enrollments" element={<AdminEnrollments />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="chat-leads" element={<ChatLeads />} />
              <Route
                path="certifications/:certificationId/library"
                element={<AdminLibrary />}
              />
              <Route
                path="quizzes/:quizId/questions"
                element={<QuizQuestions />}
              />
            </Route>

            {/* Student routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="/student/dashboard" replace />}
              />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="enrollments" element={<StudentEnrollments />} />
              <Route path="certifications" element={<StudentCertificates />} />
              <Route
                path="courses/:certificationId/library"
                element={<StudentLibrary />}
              />
              <Route path="quizzes/:quizId" element={<TakeQuiz />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="study-buddy" element={<Element />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

import { CurrencyProvider } from "./context/CurrencyProvider";
import CorporateTraining from "./pages/CorporateTraining/CorporateTraining.tsx";

function App() {
  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <CartProvider>
          <CertificationProvider>
            <AppContent />
          </CertificationProvider>
        </CartProvider>
      </CurrencyProvider>
    </ErrorBoundary>
  );
}

export default App;
