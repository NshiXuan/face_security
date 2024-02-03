import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { HashRouter } from 'react-router-dom'

import 'normalize.css'
import 'antd/dist/reset.css'
import './assets/css/index.css'

import "tracking";
import "tracking/build/data/face";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <HashRouter>
    <App />
  </HashRouter>
)
