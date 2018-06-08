import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Square from 'components/Square'

import './Line.css'

class Line extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var squares = [];
        for (let i = 0; i < this.props.nbCol; i++) {
            squares.push(<Square key={i} x={this.props.x} y={i} />);
        }

        return (
            <ul className="line">
                {squares}
            </ul>
        )
    }
}

Line.propTypes = {
    x: PropTypes.number.isRequired,
    nbCol: PropTypes.number.isRequired,
}

export default Line