import { useState } from 'react'

import './App.css'

function App() {

  const [active, setActive] = useState<boolean | null>(null);
  const [selectedDestinazione, setSelectedDestinazione] = useState<number | null>(null);

  const [flyTransition, setFlyTransition] = useState(false);




  function handleDestinazioneClick(id: number) {
    setSelectedDestinazione(id);
    setFlyTransition(true);

  setTimeout(() => {
    setSelectedDestinazione(id);
    setFlyTransition(false);
  }, 5000); // deve combaciare con la durata dell'animazione
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
      tags:[
        { name: "Mare",emoji: "🏖️"},
        { name: "Sole",emoji: "☀️"},
        { name: "Relax",emoji: "😌"}
      ],
      date: [
        { start: "09/05/2026", end: "16/05/2026" },
        { start: "09/05/2026", end: "16/05/2026" }
      ],
      img: `${import.meta.env.BASE_URL}tenerife.jpg`
    },
    {
      id: 2,
      titolo: "Amsterdam",
      tags:[
        { name: "Cultura",emoji: "🏛️"},
        { name: "Natura",emoji: "🌳"},
        { name: "Divertimento",emoji: "🎉"}
      ],
      date: [
        { start: "09/05/2026", end: "16/05/2026" },
        { start: "09/05/2026", end: "16/05/2026" }
      ],
      img: `${import.meta.env.BASE_URL}amsterdam.jpg`
    },
    {
      id: 3,
      titolo: "Madrid",
      tags:[
        { name: "Arte",emoji: "🎨"},
        { name: "Cibo",emoji: "🍽️"},
        { name: "Vita notturna",emoji: "🌃"}
      ],
      date: [
        { start: "09/05/2026", end: "16/05/2026" },
        { start: "09/05/2026", end: "16/05/2026" }
      ],
      img: `${import.meta.env.BASE_URL}madrid.jpeg`
    },
    {
      id: 4,
      titolo: "Altro",
      tags:[
        { name: "Sorpresa",emoji: "🎁"}
      ],
      date: [],
      img: `${import.meta.env.BASE_URL}sorpresa.jpg`
    }

  ]
    
  return (
    <>
      {active === null && ( // prima schermata
        <>

          <h1 className='handwriting'>Complimenti Dottoressa</h1>
          <div className="card-container">

            <div className="card-button">
              <button onClick={() => startExperience()}
              >Scopri ora il tuo regalino!</button>
            </div>
          </div>
          
            <p className="footer">
            Fatto da emi con <span className="beating-heart">❤️</span>
            </p>
        </>
      )}
      {active && selectedDestinazione === null && (
        <>
          
          <h2 className='handwriting'>Scegli la prossima meta</h2>
          <div className="card-container">
            {destinazioni.map((destinazione) => (
              <div className="card" 
                    key={destinazione.id} 
                    onClick={() => handleDestinazioneClick(destinazione.id)}>
                <h3>
                  {destinazione.titolo}
                </h3>
                {destinazione.tags?.map((tag, index) => (
                  <button key={index} className="tag-button">
                    {tag.name} {tag.emoji}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
      {flyTransition && (
        <div className="flight-transition">
          <div className="sky"></div>
          <div className="clouds"></div>
          <img src="aereo.png" className="plane-real" />
          <div className="flash"></div>
        </div>
      )}


      {active && selectedDestinazione !== null && (
        <>
          <div className='background-image' style={{
            backgroundImage: `url(${destinazioni.find(d => d.id === selectedDestinazione)?.img})`,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}>
          </div>
          
          <h3 className='handwriting'>Hai scelto </h3>
          <h1 className='handwriting'>{destinazioni.find(d => d.id === selectedDestinazione)?.titolo}</h1>

          
          
          <div className="date-container">
            <h3 className='handwriting'>Possibili date</h3>
            <div className="date-list">
            {destinazioni.find(d => d.id === selectedDestinazione)?.date.length ? (
              destinazioni.find(d => d.id === selectedDestinazione)?.date.map((dateRange, index) => (
                <p key={index} className="date-range">
                  🛫{dateRange.start} - {dateRange.end}🛬
                </p>
              ))
            ) : (
              <p className="date-range">
                Da concordare
              </p>
            )}
            </div>
            <button onClick={() => { alert("Preparati a partire! 🛫"); generaPDF(destinazioni.find(d => d.id === selectedDestinazione)) }}>
                Scarica il tuo voucher in PDF
            </button>
            <button onClick={() => { setSelectedDestinazione(null); setActive(true); }}>
                Torna alla selezione
            </button>   
          </div>
        </>
      )}
    </>
  )
}

export default App
