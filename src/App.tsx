import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.tsx'
import Work from './pages/Work.tsx';
import Home from './pages/Home.tsx';
import Contact from './pages/Contact.tsx';
import About from './pages/About.tsx';
import Disclaimer from './pages/Disclaimer.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import NakedChemistry from './pages/NakedChemistry.jsx';
import OhioSkincare from "./pages/OhioSkincare.jsx";

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-[#F1F2EB]">
        <Navbar />
        
        <Routes>
          {/* Public routes */}
          <Route path="/work" element={<Work />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/naked-chemistry-nov24" element={<NakedChemistry />} />
          <Route path="/ohio-skincare-dec24" element={<OhioSkincare />} />

          <Route path="/" element={<Home />} />
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App; 
