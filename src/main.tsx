import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App/App'
import { BrowserRouter as Router } from 'react-router-dom'

import './views/styles/reset.scss'
import './views/styles/common.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <Router>
          <App />
        </Router>
  </React.StrictMode>,
)
