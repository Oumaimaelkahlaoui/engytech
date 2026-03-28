import { lazy, Suspense, useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { supabase } from "../../backend/supabaseClient"
import ScrollToTop from "./components/ScrollToTop"

// ── Chargement immédiat (pages principales) ──
import LandingPage          from "./pages/LandingPage"
import DevisPage            from "./pages/DevisPage"
import About                from "./pages/About"
import Services             from "./pages/Services"
import Contact              from "./pages/Contact"
import Carriere             from "./pages/Carriere"
import ClientForm           from "./pages/devis/ClientForm"

// ── Lazy loading (pages secondaires + admin) ──
const Login                 = lazy(() => import("./pages/Login"))
const AdminDashboard        = lazy(() => import("./components/AdminDashboard"))
const EtudeVRD              = lazy(() => import("./pages/devis/EtudeVRD"))
const OPC                   = lazy(() => import("./pages/devis/OPC"))
const Noticencendie         = lazy(() => import("./pages/devis/Noticencendie"))
const NoteCalculs           = lazy(() => import("./pages/devis/NoteCalculs"))
const ExpertiseTechnique    = lazy(() => import("./pages/devis/ExpertiseTechnique"))
const EfficaciteEnergetique = lazy(() => import("./pages/devis/EfficaciteEnergetique"))
const SuiviControle         = lazy(() => import("./pages/devis/SuiviControle"))
const Cps                   = lazy(() => import("./pages/devis/Cps"))

function PrivateRoute({ children }) {
  const [session, setSession] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
  }, [])
  if (session === null) return null
  return session ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/"       element={<LandingPage />} />
          <Route path="/devis"  element={<DevisPage />} />
          <Route path="/about"  element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/carriere" element={<Carriere />} />

          <Route path="/login"  element={<Login />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route path="/devis/etude-structure"        element={<ClientForm />} />
          <Route path="/devis/etude-vrd"              element={<EtudeVRD />} />
          <Route path="/devis/opc"                    element={<OPC />} />
          <Route path="/devis/notice-securite-incendie" element={<Noticencendie />} />
          <Route path="/devis/note-calculs"           element={<NoteCalculs />} />
          <Route path="/devis/expertise-technique"    element={<ExpertiseTechnique />} />
          <Route path="/devis/efficacite-energetique" element={<EfficaciteEnergetique />} />
          <Route path="/devis/suivi-controle-technique" element={<SuiviControle />} />
          <Route path="/devis/cps-metres-estimation"  element={<Cps />} />
        </Routes>
      </Suspense>
    </>
  )
}