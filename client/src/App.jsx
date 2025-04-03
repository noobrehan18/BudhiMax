import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import MindMapPage from "./pages/MindMapPage";
import ModulePage from "./pages/ModulePage";
import QuizResultPage from "./pages/QuizResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import { UserProvider, UserContext } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <UserProvider> 
      <Router>
        <MainAppContent />
      </Router>
    </UserProvider>
  );
}

function MainAppContent() {
  const { user } = useContext(UserContext);

  console.log("Current user:", user); 

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute user={user}><DashboardPage /></ProtectedRoute>} 
        />
        <Route 
          path="/modules" 
          element={<ProtectedRoute user={user}><ModulePage /></ProtectedRoute>} 
        />
        <Route 
          path="/modules/:id" 
          element={<ProtectedRoute user={user}><ModulePage /></ProtectedRoute>} 
        />
        <Route 
          path="/flashcards" 
          element={<ProtectedRoute user={user}><FlashcardsPage /></ProtectedRoute>} 
        />
        <Route 
          path="/mind-map" 
          element={<ProtectedRoute user={user}><MindMapPage /></ProtectedRoute>} 
        />
        <Route 
          path="/quiz-results" 
          element={<ProtectedRoute user={user}><QuizResultPage /></ProtectedRoute>} 
        />

        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
