import React, { useState, useEffect } from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Main.css'
import './Sidebar.css'

import DevForm from './components/DevForm/index.js'
import DevItem from './components/DevItem/index.js'
// Componente - Bloco inserido de HTML, CSS e JS o qual não interfere no restante da aplicação.
// Propriedade - informações que um componente pai passa para o componente FILHO
// Estado - informações mantidas pelo componente (lembrar: imutabilidade)

function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => { 
    async function loadDevs() {
      const response = await api.get('/devs')
      
      setDevs(response.data)
    }
    loadDevs()
  }, []) //passa array vazio se quiser executar só 1x
  
async function handleAddDev(data) { 
  const response = await api.post('/devs', data)


  setDevs([...devs, response.data])
}
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem  key={dev._id} dev={dev}/>
            
          ))}  
        </ul>
      </main>      
    </div>
  )
}

export default App;
