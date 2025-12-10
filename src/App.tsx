import { useState } from 'react';
import './App.css';

function App() {
  const [active, setActive] = useState<boolean | null>(null);
  const [selectedDestinazione, setSelectedDestinazione] = useState<number | null>(null);
  const [flyTransition, setFlyTransition] = useState(false);

  async function generaPDF(titolo: string, imgPDF: string) {
  // 1️⃣ Apri SUBITO la finestra → non verrà bloccata
  const newTab = window.open('', '_blank');
  if (!newTab) {
    alert("Il browser ha bloccato il popup! Sbloccalo e riprova.");
    return;
  }

  // 2️⃣ Carica jsPDF dopo
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    //not landscape
    orientation:'portrait',
    unit: 'mm',
    format: 'a4',
  });

  doc.addImage(imgPDF, 'JPEG', 0, 0, 210, 297);
  doc.setFont('helvetica');
  doc.setFontSize(30);
  doc.setTextColor(0, 0, 0);

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.text('Voucher per', pageWidth / 2, pageHeight / 2, { align: 'center' });

  doc.setFontSize(40);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 0, 0);

  doc.text(titolo, pageWidth / 2, pageHeight / 2 + 15, { align: 'center' });

  // 3️⃣ Genera il blob
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);

  // 4️⃣ Carica nel tab già aperto
  newTab.location.href = blobUrl;
}



  const destinazioni = [
    {
      id: 1,
      titolo: 'Londra',
      tags: [
        { name: 'Cultura', emoji: '🏛️' }  ,
        { name: 'Harry Potter', emoji: '🪄' },
        { name: 'Friends', emoji: '☕' }
      ],
      date: [
        { start: '11/03/2026', end: '18/05/2026' }
      ],
      img: `${import.meta.env.BASE_URL}londra.png`,
      imgPDF: `${import.meta.env.BASE_URL}londra_pdf.png`,
      passportRequired: true,
    },
    {
      id: 2,
      titolo: 'Tenerife',
      tags: [
        { name: 'Mare', emoji: '🏖️' },
        { name: 'Sole', emoji: '☀️' },
        { name: 'Relax', emoji: '😌' },
      ],
      date: [
        { start: '09/05/2026', end: '16/05/2026' },
        { start: '09/05/2026', end: '16/05/2026' },
      ],
      img: `${import.meta.env.BASE_URL}tenerife.jpg`,
      imgPDF: `${import.meta.env.BASE_URL}tenerife_pdf.png`,
      passportRequired: false,
    },
    {
      id: 3,
      titolo: 'Amsterdam',
      tags: [
        { name: 'Cultura', emoji: '🏛️' },
        { name: 'Natura', emoji: '🌳' },
        { name: 'Divertimento', emoji: '🎉' },
      ],
      date: [
        { start: '09/05/2026', end: '16/05/2026' },
        { start: '09/05/2026', end: '16/05/2026' },
      ],
      img: `${import.meta.env.BASE_URL}amsterdam.jpg`,
      imgPDF: `${import.meta.env.BASE_URL}amsterdam_pdf.png`,
      passportRequired: false,
    },
    {
      id: 4,
      titolo: 'Madrid',
      tags: [
        { name: 'Arte', emoji: '🎨' },
        { name: 'Cibo', emoji: '🍽️' },
        { name: 'Vita notturna', emoji: '🌃' },
      ],
      date: [
        { start: '09/05/2026', end: '16/05/2026' },
        { start: '09/05/2026', end: '16/05/2026' },
      ],
      img: `${import.meta.env.BASE_URL}madrid.jpg`,
      imgPDF: `${import.meta.env.BASE_URL}madrid_pdf.png`,
      passportRequired: false,
    },
    {
      id: 5,
      titolo: 'Altro',
      tags: [{ name: 'Sorpresa', emoji: '🎁' }],
      date: [],
      img: `${import.meta.env.BASE_URL}sorpresa.jpg`,
      imgPDF: `${import.meta.env.BASE_URL}altro_pdf.png`,
      passportRequired: false,
    },
  ];

  function handleDestinazioneClick(id: number) {
    setSelectedDestinazione(id);
    setFlyTransition(true);
    setTimeout(() => {
      setFlyTransition(false);
    }, 6000);
  }

  function startExperience() {
    setActive(true);
  }

  const currentDestinazione = destinazioni.find(d => d.id === selectedDestinazione);

  return (
    <>
      {active === null && (
            document.body.classList.add("no-scroll"),

        <>
        <div className="intro-container">
          <h1 className="handwriting">Complimenti Dottoressa</h1>
          <div className="card-container" style={{paddingTop:20}}>
            <div className="card-button">
              <button onClick={() => startExperience()}>Scopri ora il tuo regalino!</button>
            </div>
          </div>
          <p className="footer">
            Fatto da emi con <span className="beating-heart">❤️</span>
          </p>
        </div>
        </>
      )}

      {active && selectedDestinazione === null && (
        document.body.classList.remove("no-scroll"),
        <>
          <h2 className="handwriting">Scegli la prossima meta</h2>
          <div className="card-container" style={{paddingTop:20}}>
            {destinazioni.map(destinazione => (
              <div
                className="card"
                key={destinazione.id}
                onClick={() => handleDestinazioneClick(destinazione.id)}
              >
                <h3>{destinazione.titolo}</h3>
                {destinazione.tags?.map((tag, index) => (
                  <button key={index} className="tag-button">
                    {tag.name} {tag.emoji}
                  </button>
                ))}
                {destinazione.passportRequired && (
                  <p className="passport-banner">🛂 Passaporto richiesto</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {flyTransition && (
            document.body.classList.add("no-scroll"),
        <div className="flight-transition">
          <div className="sky"></div>
          <div className="clouds"></div>
          <img src="aereo.png" className="plane-real" />
          <div className="flash"></div>
        </div>
      )}

      {active && selectedDestinazione !== null && currentDestinazione && (
                    document.body.classList.add("no-scroll"),

        <>
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${currentDestinazione.img})`,              
              }}>
                
          </div>


          <h3 className="handwriting">Hai scelto</h3>
          <h1 className="handwriting">{currentDestinazione.titolo}</h1>

          <div className="date-container">
            <h3 className="handwriting">Possibili date</h3>
            <div className="date-list">
              {currentDestinazione.date.length ? (
                currentDestinazione.date.map((dateRange, index) => (
                  <p key={index} className="date-range">
                    🛫{dateRange.start} - {dateRange.end}🛬
                  </p>
                ))
              ) : (
                <p className="date-range">Da concordare</p>
              )}
            </div>

            <button
              className="voucher-button"
              onClick={() => {
                generaPDF(currentDestinazione.titolo, currentDestinazione.imgPDF);
              }}
            >
              Scarica il tuo voucher 🎟️
            </button>


            <button
              onClick={() => {
                setSelectedDestinazione(null);
                setActive(true);
              }}
            >
              Torna alla selezione
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default App;