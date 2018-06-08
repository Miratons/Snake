import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Line from 'components/Line'

class Map extends Component {
    constructor(props) {
        super(props)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    render() {
        var lines = [];
        for (let i = 0; i < this.props.nbLine; i++) {
            lines.push(<Line key={i} y={i} />);
        }

        return (
            <div id="game">
                <div className="grid">
                    {lines}
                </div>
                <input type="text" id="inputSnake" onKeyUp={this.handleKeyPress} />
            </div>
        )
    }

    componentDidMount() {

    }

    handleKeyPress(event) {
        this.props.updateAxe(event.target.value)
        event.target.value = null
    }
}

Map.propTypes = {
    nbLine: PropTypes.number.isRequired,
    updateAxe: PropTypes.func.isRequired
}

export default Map