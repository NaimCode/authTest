import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AppWrapper from './app/appWrapper.tsx'
import App from './app/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
)
