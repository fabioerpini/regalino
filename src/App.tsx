import { useState } from 'react'

import './App.css'

function App() {

  const [active, setActive] = useState<boolean | null>(null);
  const [selectedDestinazione, setSelectedDestinazione] = useState<number | null>(null);

  function handleDestinazioneClick(id: number) {
    setSelectedDestinazione(id);
  }

  function startExperience() {
    setActive(true);
  }

  function generaPDF(destinazione: {id: number; titolo: string; img: string} | undefined) {
    if (!destinazione) return;

    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF();

      doc.setFontSize(22);
      doc.text(`Voucher per ${destinazione.titolo}`, 20, 30);
      doc.setFontSize(16);
      doc.text(`Congratulazioni Dottoressa!`, 20, 50);
      doc.setFontSize(12);
      doc.text(`Questo voucher ti dà diritto a un viaggio indimenticabile a ${destinazione.titolo}.`, 20, 60);
      doc.text(`Goditi il tuo viaggio!`, 20, 70);
      doc.addImage(destinazione.img, 'JPEG', 15, 80, 180, 100);
      doc.save(`voucher_${destinazione.titolo}.pdf`);
    });
  }

  const destinazioni = [
    {
      id: 1,
      titolo: "Tenerife",
      img: "/resources/tenerife.jpg"
    },
    {
      id: 2,
      titolo: "Amsterdam",
      img: "/resources/amsterdam.jpg"
    },
    {
      id: 3,
      titolo: "Madrid",
      img: "/resources/madrid.jpeg"
    }

  ]
    
  return (
    <>
      {active === null && ( // prima schermata
        <>
          <h1>Complimenti Dottoressa!</h1>
          <div className="card-container">

            <div className="card-button">
              <button onClick={() => startExperience()}
              >Scopri ora il tuo regalino!</button>
            </div>
          </div>
          
            <p className="read-the-docs">
            Fatto da emi con <span className="beating-heart">❤️</span>
            </p>
        </>
      )}
      {active && selectedDestinazione === null && (
        <>
          <h2>Scegli la prossima meta</h2>
          <div className="card-container">
            {destinazioni.map((destinazione) => (
              <div className="card" 
                    key={destinazione.id} 
                    onClick={() => handleDestinazioneClick(destinazione.id)}>
                <h3>
                  {destinazione.titolo}
                  </h3>
              </div>
            ))}
          </div>
        </>
      )}
      {active && selectedDestinazione !== null && (
        <>
        <div className='background-image' style={{
            backgroundImage: `url(${destinazioni.find(d => d.id === selectedDestinazione)?.img})`,
          }}>
          </div>
          
          <h1>Hai scelto {destinazioni.find(d => d.id === selectedDestinazione)?.titolo}!</h1>
          <div className="card-container">

            <div className="card">
              <button onClick={() => { alert("Preparati a partire! 🛫"); generaPDF(destinazioni.find(d => d.id === selectedDestinazione) )}}>
                Scarica il tuo voucher in PDF
              </button>
            </div>
            <div className="card-container">
              <button onClick={() => {  setSelectedDestinazione(null); }}>
                Torna indietro
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default App
