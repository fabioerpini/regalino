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
      titolo: "Tenerife"
    },
    {
      id: 2,
      titolo: "Amsterdam"
    },
    {
      id: 3,
      titolo: "Madrid"
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
            Fatto da emi con ❤️
          </p>
        </>
      )}
      {active && selectedDestinazione === null && (
        <>
          <h1>Scegli la prossima meta</h1>
          <div className="card-container">
            {destinazioni.map((destinazione) => (
              <div className="card" key={destinazione.id}>
                <button key={destinazione.id} onClick={() => handleDestinazioneClick(destinazione.id)}>
                  {destinazione.titolo}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
      {active && selectedDestinazione !== null && (
        <>
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
