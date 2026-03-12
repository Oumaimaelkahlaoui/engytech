import React, { useState } from 'react'
import { supabase } from '../../../backend/supabaseClient'
import Navbar from "./Navbar";
import Footer from "./MainFooter";

export default function ClientForm() {
  const [nomcompelt, setNomCompelt] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [typeProjet, setTypeProjet] = useState('')
  const [surface, setSurface] = useState('')
  const [files, setFiles] = useState([])
  const [typeStructure, setTypeStructure] = useState('');
  
  // États pour le type de structure (radio buttons)
  const [betonArme, setBetonArme] = useState(false)
  const [charpenteMetalique, setCharpenteMetalique] = useState(false)
  const [mixte, setMixte] = useState(false)

  const handleFiles = (e) => {
    console.log(e.target.files)
    setFiles([...e.target.files])
  }

  async function uploadFile(file) {
    const { data, error } = await supabase.storage
      .from('documents-projects')
      .upload(`files/${Date.now()}-${file.name}`, file)

    if (error) {
      console.error(error)
      return null
    }
    return data.path
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // récupérer automatiquement id du devis
      const { data: devisData, error: devisError } = await supabase
        .from("devis_types")
        .select("id")
        .eq("nom_devis", "Étude de structure (béton armé / métallique)")
        .single()

      if (devisError) {
        console.log("ERREUR TYPE DEVIS:", devisError)
        return
      }

      const devisTypeId = devisData.id
      // 1️⃣ Insert demande
      const { data: newDemande, error: insertError } = await supabase
        .from('demandes_devis')
        .insert([
          {    
           devis_type_id: devisTypeId, // 👈 هذا هو المهم
            nomcompelt, 
            email, 
            telephone, 
            type_projet: typeProjet, 
            surface,
            type_structure: typeStructure // <- ici

          }
        ])
        .select()

      if (insertError) {
        console.log("INSERT DEMANDE ERROR:", insertError)
        return
      }

      const demandeId = newDemande[0].id
      console.log("DEMANDE ID:", demandeId)

      // 2️⃣ Upload files
      for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`

        const { data, error } = await supabase.storage
          .from("documents-projects")
          .upload(`files/${fileName}`, file)

        if (error) {
          console.log("UPLOAD ERROR:", error)
          continue
        }

        console.log("UPLOAD SUCCESS:", data.path)

        // 3️⃣ Insert document
        const { error: docError } = await supabase
          .from("documents")
          .insert({
            demande_id: demandeId,
            file_name: file.name,
            file_path: `files/${fileName}`  
          })

        if (docError) {
          console.log("INSERT DOCUMENT ERROR:", docError)
        } else {
          console.log("DOCUMENT SAVED")
        }
      }

      alert("Devis envoyé avec succès !")

    } catch (err) {
      console.log("GLOBAL ERROR:", err)
    }
  }

  return (
   <>
       <Navbar />
 
    <form onSubmit={handleSubmit}>
      
         {/* Radio buttons pour type de structure */}
     <div style={{ margin: '15px 0' }}>
      <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Type de structure :</p>
      <label style={{ display: 'inline-flex', alignItems: 'center', marginRight: '20px', cursor: 'pointer' }}>
        <input
          type="radio"
          name="typeStructure"
          value="béton armé"
          checked={typeStructure === 'béton armé'}
          onChange={e => setTypeStructure(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        Béton armé
      </label>

      <label style={{ display: 'inline-flex', alignItems: 'center', marginRight: '20px', cursor: 'pointer' }}>
        <input
          type="radio"
          name="typeStructure"
          value="charpente métallique"
          checked={typeStructure === 'charpente métallique'}
          onChange={e => setTypeStructure(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        Charpente métallique
      </label>

      <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
        <input
          type="radio"
          name="typeStructure"
          value="mixte"
          checked={typeStructure === 'mixte'}
          onChange={e => setTypeStructure(e.target.value)}
          style={{ marginRight: '5px' }}
        />
        Mixte
      </label>
    </div> 

      <input value={nomcompelt} onChange={e => setNomCompelt(e.target.value)} placeholder="Nom Complet" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
      <input value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="Téléphone" required />
      <input value={typeProjet} onChange={e => setTypeProjet(e.target.value)} placeholder="Type de projet" required />
      <input value={surface} onChange={e => setSurface(e.target.value)} placeholder="Surface" type="number" required />

   
      <input type="file" multiple onChange={handleFiles} />
      <button type="submit">Envoyer Devis</button>
        
    </form>
        <Footer />
  </>
   
  )

}