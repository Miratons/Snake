import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Map from 'components/Map'
import store from 'store'

import './style.css'

render (
    <div id="content">
        <h1>Snakie</h1>
        <Provider store={store}>
            <Map nbLine={10} nbCol={10} timer={1000} />
        </Provider>
    </div>,
    document.querySelector('#mount')
)