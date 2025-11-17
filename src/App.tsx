import { useState } from 'react';
import './App.css';

function App() {
  const [active, setActive] = useState<boolean | null>(null);
  const [selectedDestinazione, setSelectedDestinazione] = useState<number | null>(null);
  const [flyTransition, setFlyTransition] = useState(false);

  function generaPDF(titolo: string, imgPDF: string) {
    import('jspdf').then(({ jsPDF }) => {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      doc.addImage(imgPDF, 'JPEG', 0, 0, 297, 210);
      doc.setFont('helvetica');
      doc.setFontSize(30);
      doc.setTextColor(0, 0, 0);
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.text('Voucher per', pageWidth / 2, pageHeight / 2 , { align: 'center' });
      doc.setFontSize(40);
            doc.setFont('helvetica','bold');

      
      doc.setTextColor(255, 0, 0);
      doc.text(titolo, pageWidth / 2, pageHeight / 2 + 15, { align: 'center' });

      doc.save(`Voucher_${titolo}.pdf`);

    });
  }

  const destinazioni = [
    {
      id: 1,
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

    },
    {
      id: 2,
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

    },
    {
      id: 3,
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

    },
    {
      id: 4,
      titolo: 'Altro',
      tags: [{ name: 'Sorpresa', emoji: '🎁' }],
      date: [],
      img: `${import.meta.env.BASE_URL}sorpresa.jpg`,
      imgPDF: `${import.meta.env.BASE_URL}sorpresa_pdf.png`,

    },
  ];

  function handleDestinazioneClick(id: number) {
    setSelectedDestinazione(id);
    setFlyTransition(true);
    setTimeout(() => {
      setFlyTransition(false);
    }, 500);
  }

  function startExperience() {
    setActive(true);
  }

  const currentDestinazione = destinazioni.find(d => d.id === selectedDestinazione);

  return (
    <>
      {active === null && (
        <>
          <h1 className="handwriting">Complimenti Dottoressa</h1>
          <div className="card-container">
            <div className="card-button">
              <button onClick={() => startExperience()}>Scopri ora il tuo regalino!</button>
            </div>
          </div>
          <p className="footer">
            Fatto da emi con <span className="beating-heart">❤️</span>
          </p>
        </>
      )}

      {active && selectedDestinazione === null && (
        <>
          <h2 className="handwriting">Scegli la prossima meta</h2>
          <div className="card-container">
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

      {active && selectedDestinazione !== null && currentDestinazione && (
        <>
          <div
            className="background-image"
            style={{
              backgroundImage: `url(${currentDestinazione.img})`,
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}
          ></div>

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
