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

  const destinazioni = [
    {
      id: 1,
      titolo: "Tenerife",
      img: "https://www.baltana.com/files/wallpapers-29/Tenerife-Island-Wallpaper-HD-93853.jpg"
    },
    {
      id: 2,
      titolo: "Amsterdam",
      img: "https://becentsational.com/wp-content/uploads/2021/04/Amsterdam-iPhone-Wallpaper-8.jpg"
    },
    {
      id: 3,
      titolo: "Madrid",
      img: "https://wallpaper.forfun.com/fetch/e9/e9057a82be6f97d3ad0efb378f9d0c72.jpeg?h=900&r=0.5&f=webp"
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
          <button onClick={() => {  setSelectedDestinazione(null); }}>
            Torna indietro
          </button>
        </>
      )}
    </>
  )
}

export default App
