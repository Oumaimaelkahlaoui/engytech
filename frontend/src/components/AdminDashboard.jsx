import { useState, useEffect } from "react";
import { supabase } from "../../../backend/supabaseClient";

import { GlobalStyles }            from "../components/admin/shared/GlobalStyles";
import { Sidebar }                 from "../components/admin/sidebar/Sidebar";
import { DevisView }               from "../components/admin/devis/DevisView";
import { EditModal }               from "../components/admin/devis/EditModal";
import { CandidaturesView }        from "../components/admin/candidatures/CandidaturesView";
import { FacturesView }            from "../components/admin/factures/FacturesView";
import { PrintPreviewAttestation } from "../components/admin/attestation/PrintPreviewAttestation";
import { Ic }                      from "../components/admin/icons/Icons";
import { TYPES }                   from "../components/admin/devis/devisConfig";

export default function AdminDashboard() {
  GlobalStyles();

  const [demandes,      setDemandes]      = useState([]);
  const [candidatures,  setCandidatures]  = useState([]);
  const [factures,      setFactures]      = useState([]);
  const [activeSection, setActiveSection] = useState("devis");
  const [activeKey,     setActiveKey]     = useState(null);
  const [editingId,     setEditingId]     = useState(null);
  const [editData,      setEditData]      = useState({});
  const [openSections,  setOpenSections]  = useState({ devis: true, rh: true, factures: true, Attestation: true });

  useEffect(() => {
    fetchDemandes();
    fetchCandidatures();
    supabase.from("factures").select("*").then(({ data }) => data && setFactures(data));
  }, []);

  async function fetchDemandes() {
    const { data, error } = await supabase
      .from("demandes_devis")
      .select("*, devis_types(nom_devis), documents(file_name, file_path)")
      .order("created_at", { ascending: false });
    if (!error) setDemandes(data);
  }

  async function fetchCandidatures() {
    const { data, error } = await supabase.from("candidatures").select("*").order("created_at", { ascending: false });
    if (!error) setCandidatures(data);
  }

  async function marquerTraite(id) {
    await supabase.from("demandes_devis").update({ status: "traité" }).eq("id", id);
    fetchDemandes();
  }

  async function deleteDemande(id) {
    if (!window.confirm("Supprimer cette demande ?")) return;
    await supabase.from("demandes_devis").delete().eq("id", id);
    fetchDemandes();
  }

  function startEdit(d) { setEditingId(d.id); setEditData({ ...d }); }

  async function saveEdit() {
    await supabase.from("demandes_devis").update({
      nomcompelt: editData.nomcompelt, email: editData.email, telephone: editData.telephone,
      surface: editData.surface, type_projet: editData.type_projet, type_structure: editData.type_structure,
      budget_projet: editData.budget_projet, date_demarrage: editData.date_demarrage,
      localisation: editData.localisation, description: editData.description,
    }).eq("id", editingId);
    setEditingId(null);
    fetchDemandes();
  }

  async function handleLogout() {
    if (!window.confirm("Se déconnecter ?")) return;
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  function handleNavigate(section, key) {
    setActiveSection(section);
    setActiveKey(key);
  }

  function toggleSection(s) {
    setOpenSections(prev => ({ ...prev, [s]: !prev[s] }));
  }

  const activeConf = TYPES.find(t => t.key === activeKey);
  const callbacks  = { traite: marquerTraite, edit: startEdit, del: deleteDemande };

  return (
    <div className="g-root">
      <Sidebar
        activeSection={activeSection}
        activeKey={activeKey}
        demandes={demandes}
        candidatures={candidatures}
        factures={factures}
        openSections={openSections}
        onToggleSection={toggleSection}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <div className="g-main">
        {activeSection === "rh" && (
          <CandidaturesView candidatures={candidatures} onRefresh={fetchCandidatures} />
        )}

        {activeSection === "factures" && <FacturesView />}

        {activeSection === "Attestation" && <PrintPreviewAttestation />}

        {activeSection === "devis" && !activeKey && (
          <div className="g-welcome">
            <div className="g-welcome-ico">{Ic.arrow("#94a3b8")}</div>
            <h2>Sélectionnez un type de devis</h2>
            <p>Choisissez une catégorie dans le menu de gauche.<br />Chaque type affiche ses propres colonnes.</p>
            <div className="g-welcome-hint">
              {Ic.filter("#64748b")}
              <span>{TYPES.length - 1} types · {demandes.length} demande{demandes.length !== 1 ? "s" : ""} au total</span>
            </div>
          </div>
        )}

        {activeSection === "devis" && activeKey && activeConf && (
          <DevisView
            activeKey={activeKey}
            activeConf={activeConf}
            demandes={demandes}
            callbacks={callbacks}
          />
        )}
      </div>

      {editingId && (
        <EditModal
          data={editData}
          onChange={setEditData}
          onSave={saveEdit}
          onCancel={() => setEditingId(null)}
        />
      )}
    </div>
  );
}