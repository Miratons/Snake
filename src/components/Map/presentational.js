import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Line from 'components/Line'
import Mask from 'components/Mask'

import './Map.css'

class Map extends Component {
    constructor(props) {
        super(props)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        var lines = [];
        for (let i = 0; i < this.props.nbLine; i++) {
            lines.push(<Line key={i} y={i} />);
        }

        return (
            <div id="game" onClick={this.handleClick}>
                <div className="grid">
                    {lines}
                </div>
                <Mask />
                <input type="text" id="inputSnake" onKeyUp={this.handleKeyPress} />
            </div>
        )
    }

    handleKeyPress(event) {
        this.props.updateAxe(event.target.value)
        event.target.value = null
    }

    handleClick(e) {
        document.getElementById("inputSnake").focus()
    }
}

Map.propTypes = {
    nbLine: PropTypes.number.isRequired,
    updateAxe: PropTypes.func.isRequired
}

export default Map