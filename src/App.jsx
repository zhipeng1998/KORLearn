import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import Hangul from './pages/Hangul';
import VocabModule from './components/Vocabulary/VocabModule';
import GrammarModule from './components/Grammar/GrammarModule';
import DashboardModule from './components/Dashboard/DashboardModule';
import QuizModule from './components/Quiz/QuizModule';
import AdminModule from './components/Admin/AdminModule';
import AuthModule from './components/Auth/AuthModule';
import './App.css'; 

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthModule />} />
              <Route path="/hangul" element={<Hangul />} />
              <Route path="/grammar" element={<div className="page-container"><GrammarModule /></div>} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute><div className="page-container"><DashboardModule /></div></ProtectedRoute>
              } />
              <Route path="/vocabulary" element={
                <ProtectedRoute><div className="page-container"><VocabModule /></div></ProtectedRoute>
              } />
              <Route path="/quiz" element={
                <ProtectedRoute><div className="page-container"><QuizModule /></div></ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute><div className="page-container"><AdminModule /></div></ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
