import { useState } from 'react'

import './App.css'

function App() {

  const [active, setActive] = useState<boolean | null>(null);

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
          <div className="card">
            <button onClick={() => startExperience()}
            >Scopri ora il tuo regalino!</button>
          </div>
          
          <p className="read-the-docs">
            Fatto da emi con ❤️
          </p>
        </>
      )}
      {active && (
        <>
          <h1>Scegli la prossima meta</h1>
          <div className="card">
            {destinazioni.map((destinazione) => (
              
              <button id={destinazione.id.toString()} className="card-button">
                {destinazione.titolo}
              </button>
            ))}
          </div>
        </>
      )}





    </>
    
  )
}

export default App
