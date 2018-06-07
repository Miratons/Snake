import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import Map from 'components/Map'
import store from 'store'

render (
    <div>
        <h1>Hello World</h1>
        <Provider store={store}>
            <Map nbLine={10} nbCol={10} timer={1000} />
        </Provider>
    </div>,
    document.querySelector('#mount')
)