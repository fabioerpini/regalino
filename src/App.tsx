import { useState } from 'react';
import './App.css';

function App() {
  const [active, setActive] = useState<boolean | null>(null);
  const [selectedDestinazione, setSelectedDestinazione] = useState<number | null>(null);
  const [flyTransition, setFlyTransition] = useState(false);

  const destinazioni = [
    {
      id: 1,
      titolo: 'Londra',
      tags: [
        { name: 'Cultura', emoji: '🏛️' },
        { name: 'Harry Potter', emoji: '🪄' },
        { name: 'Friends', emoji: '☕' }
      ],
      date: [
        { start: '17/03/2026', end: '24/03/2026' }
      ],
      img: `${import.meta.env.BASE_URL}londra.png`,
      imgPDF: `${import.meta.env.BASE_URL}londra_pdf.png`,
      passportRequired: true,
      disabled: true
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
        { start: '18/06/2026', end: '25/06/2026' }
      ],
      img: `${import.meta.env.BASE_URL}tenerife.png`,
      imgPDF: `${import.meta.env.BASE_URL}tenerife_pdf.png`,
      passportRequired: false,
      disabled: false
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
        { start: '11/01/2026', end: '18/01/2026' },
        { start: '02/02/2026', end: '09/02/2026' },
      ],
      img: `${import.meta.env.BASE_URL}amsterdam.png`,
      imgPDF: `${import.meta.env.BASE_URL}amsterdam_pdf.png`,
      passportRequired: false,
      disabled: true
    },
    {
      id: 4,
      titolo: 'Madrid',
      tags: [
        { name: 'Arte', emoji: '🎨' },
        { name: 'Cibo', emoji: '🍽️' },
        { name: 'Baciuski', emoji: '💋' },
      ],
      date: [
        { start: '30/01/2026', end: '06/02/2026' },
        { start: '26/03/2026', end: '01/04/2026' },
      ],
      img: `${import.meta.env.BASE_URL}madrid.png`,
      imgPDF: `${import.meta.env.BASE_URL}madrid_pdf.png`,
      passportRequired: false,
      disabled: true
    },
    {
      id: 5,
      titolo: 'Altro',
      tags: [{ name: 'Sorpresa', emoji: '🎁' }],
      date: [],
      img: `${import.meta.env.BASE_URL}altro.png`,
      imgPDF: `${import.meta.env.BASE_URL}altro_pdf.png`,
      passportRequired: false,
      disabled: true
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



  async function handleCameraPhoto(imgPDF: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {


      const base64img = reader.result as string;


      generaPDF(imgPDF, base64img);
    };
    reader.readAsDataURL(file);
  }

  async function generaPDF(imgPDF: string, cameraInput?: string) {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    doc.addImage(imgPDF, 'JPEG', 0, 0, 210, 297);

    if (cameraInput) {
      cameraInput = await new Promise<string>((resolve) => {
        const img = new Image();
        img.src = cameraInput!;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const size = Math.min(img.width, img.height);
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(
            img,
            (img.width - size) / 2,
            (img.height - size) / 2,
            size, size,
            0, 0,
            size, size
          );
          resolve(canvas.toDataURL('image/jpeg'));
        };
      });
      doc.addImage(cameraInput, 'JPEG', 68, 126, 75, 75, undefined, undefined, -1);
    }
    // 2️⃣ genera il blob
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfUrl);


  }
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  function openVoucherTab() {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  }




  return (
    <>
      {active === null && (
        <>
          {document.body.classList.add("no-scroll")}
          {document.body.classList.add("add-bg-color")}
          <div className="intro-container">
            <h1 className="handwriting">Complimenti Dottoressa</h1>
            <div className="card-container" style={{ paddingTop: 20 }}>
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
        <>
          {document.body.classList.remove("no-scroll")}
          {document.body.classList.add("add-bg-color")}
          <h2 className="handwriting">Scegli la prossima meta</h2>
          <div className="card-container" style={{ paddingTop: 20 }}>
            {destinazioni.map(destinazione => (
              <div
                className="card"
                key={destinazione.id}

                style={destinazione.disabled ? { opacity: 0.3, pointerEvents: 'none', cursor: 'not-allowed' } : {}}

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
      )
      }

      {
        flyTransition && (
          <>
            {document.body.classList.add("no-scroll")}
            {document.body.classList.remove("add-bg-color")}
            <div className="flight-transition">
              <div className="sky"></div>
              <div className="clouds"></div>
              <img src="aereo.png" className="plane-real" />
              <div className="flash"></div>
            </div>
          </>
        )
      }

      {
        active && selectedDestinazione !== null && currentDestinazione && (
          <>
            {window.scrollTo(0, 0)}
            {document.body.classList.add("no-scroll")}
            {document.body.classList.remove("add-bg-color")}
            <div className="background-image"
              style={{ backgroundImage: `url(${currentDestinazione.img})` }}>
            </div>

            <h3 className="handwriting" style={{
              color: 'white',
              textShadow: '2px 2px 20px rgba(255, 255, 255, 0.7)',
            }}>Hai scelto</h3>

            <h1 className="handwriting" style={{
              color: 'white',
              textShadow: '2px 2px 20px rgba(255, 255, 255, 0.7)',
            }}>{currentDestinazione.titolo}</h1>

            <div className="date-container">
              <h3 className="handwriting">Viaggio prenotato</h3>
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
                  alert('Ora facciamoci una foto!📸\nOppure scegline una dalla galleria');
                  document.getElementById('cameraInput')?.click();
                }}
              >
                Scatta foto per il voucher 🎟️
              </button>
              <input
                type="file"
                accept="image/*"
                id="cameraInput"
                style={{ display: "none" }}
                onChange={(e) =>
                  handleCameraPhoto(currentDestinazione.imgPDF, e)
                }
              />
              {pdfUrl && (
                <>
                  {document.body.classList.remove("no-scroll")}

                  <div className="voucher-confirm">
                    <p>Foto caricata! ✅</p>
                    <button onClick={openVoucherTab}>Apri il voucher</button>
                  </div>
                </>
              )}


              <button
                onClick={() => {
                  setSelectedDestinazione(null);
                  setActive(true);
                  setPdfUrl(null);
                }}
              >
                Torna alla selezione
              </button>
            </div>
          </>
        )
      }
    </>
  );
}

export default App;