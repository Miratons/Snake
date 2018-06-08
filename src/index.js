import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from 'components/App'
import store from 'store'

import './style.css'

render (
    <div id="content">
        <h1>Snakie</h1>
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    document.querySelector('#mount')
)