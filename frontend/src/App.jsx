import React, { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { supabase } from "../../backend/supabaseClient" 
import LandingPage from "./pages/LandingPage";
import DevisPage from "./pages/DevisPage";
import AdminDashboard from "./components/AdminDashboard";
import EtudeVRD from "./pages/devis/EtudeVRD";
import OPC from "./pages/devis/OPC";
import ClientForm from "./pages/devis/ClientForm"
import Noticencendie from "./pages/devis/Noticencendie";
import NoteCalculs from "./pages/devis/NoteCalculs";
import ExpertiseTechnique from "./pages/devis/ExpertiseTechnique";
import EfficaciteEnergetique from "./pages/devis/EfficaciteEnergetique";
import SuiviControle from "./pages/devis/SuiviControle";
import Cps from "./pages/devis/Cps";
import Carriere from "./pages/Carriere";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

import Login from './pages/Login'

function PrivateRoute({ children }) {
  const [session, setSession] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
  }, [])
  if (session === null) return null // loading
  return session ? children : <Navigate to="/login" replace />
}
// Force rebuild Vercel - aucun EtudeStructure
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>


        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/devis" element={<DevisPage />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/devis/etude-structure" element={<ClientForm />} />

        <Route path="/devis/etude-vrd" element={<EtudeVRD />} />
        <Route path="/devis/opc" element={<OPC />} />
        <Route path="/devis/notice-securite-incendie" element={<Noticencendie />} />
        <Route path="/devis/note-calculs" element={<NoteCalculs />} />
        <Route path="/devis/expertise-technique" element={<ExpertiseTechnique />} />
        <Route path="/devis/efficacite-energetique" element={<EfficaciteEnergetique />} />
        <Route path="/devis/suivi-controle-technique" element={<SuiviControle />} />
        <Route path="/devis/cps-metres-estimation" element={<Cps />} />

        <Route path="/carriere" element={<Carriere />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}