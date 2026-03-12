

import { useEffect, useState } from "react";
import { supabase } from "../../../backend/supabaseClient";

export default function AdminDashboard() {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    fetchDemandes();
  }, []);

  // ✅ Fetch demandes avec documents
  async function fetchDemandes() {
    const { data, error } = await supabase
      .from("demandes_devis")
      .select(`
        *,
        devis_types(nom_devis),
        documents(file_name, file_path)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setDemandes(data);
    }
  }

  // ✅ Générer signed URL pour fichiers private
  const getSignedUrl = async (filePath) => {
    if (!filePath) return null;
    const { data, error } = await supabase.storage
      .from("documents-projects") // <== bucket name
      .createSignedUrl(filePath, 3600); // 60 secondes validité
    if (error) {
      console.log(error);
      return null;
    }
    return data.signedUrl;
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Demandes de devis</h2>

      {demandes.length === 0 && <p style={{ textAlign: "center" }}>Aucune demande pour le moment</p>}

      {demandes.map((d) => (
        <div
          key={d.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <p><b>Client:</b> {d.nomcompelt}</p>
          <p><b>Email:</b> {d.email}</p>
          <p><b>Téléphone:</b> {d.telephone}</p>
          <p><b>Type Projet:</b> {d.type_projet}</p>
          <p><b>Surface:</b> {d.surface} m²</p>
           <p><b>Type Structuré:</b> {d.type_structure}</p>
          <p><b>Type Devis:</b> {d.devis_types?.nom_devis}</p>

          <div>
            <b>Documents:</b>
            {d.documents?.length === 0 && <p>Aucun fichier</p>}
            {d.documents?.map((doc, i) => (
              <SignedFileLink key={i} file={doc} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ✅ Component pour signed URL
function SignedFileLink({ file }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    async function fetchUrl() {

      console.log("FILE PATH:", file.file_path)

      const { data, error } = await supabase.storage
        .from("documents-projects")
        .createSignedUrl(file.file_path, 60);

      if (error) {
        console.log("SIGNED URL ERROR:", error)
      } else {
        console.log("SIGNED URL:", data.signedUrl)
        setUrl(data.signedUrl)
      }
    }

    fetchUrl()

  }, [file.file_path])
  if (!url) return <span>Chargement...</span>;

  return (
    <div>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "underline" }}>
        {file.file_name}
      </a>
    </div>
  );
}
