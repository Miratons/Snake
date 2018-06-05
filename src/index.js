import React from 'react'
import { render } from 'react-dom'

import Map from 'components/Map'

render (
    <div>
        <h1>Hello World</h1>
        <Map nbLine={10} nbCol={10} timer={1000} />
    </div>,
    document.querySelector('#mount')
)