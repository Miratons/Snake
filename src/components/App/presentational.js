import React, { Component, Fragment } from 'react'

import Map from 'components/Map'

import './App.css'

class App extends Component {

    render() {
        let view = this.props.isOver ? (
            <p className="game-over">GAME OVER</p>
        ) : (
            <div id="game-in-progress">
                <p>Taille du serpent : <span>{this.props.snake.length}</span></p>
                <Map />
            </div>
        )

        return (
            <Fragment>
                {view}
            </Fragment>
        )
    }
}

export default App