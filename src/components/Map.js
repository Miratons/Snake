import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Line from 'components/Line'

class Map extends Component {
    constructor(props) {
        super(props)
        this.start = this.start.bind(this)
        this.addSnakedSquare = this.addSnakedSquare.bind(this)

        this.state = {
            snake: []
        }
    }

    render() {
        var lines = [];
        for (let i = 0; i < this.props.nbLine; i++) {
            lines.push(<Line key={i} nbCol={this.props.nbCol} x={i} snake={this.state.snake} />);
        }

        return (
            <Fragment>
                {lines}
            </Fragment>
        )
    }

    componentDidMount() {
        this.start()
    }

    start() {
        this.setState({
            snake: [
                {x: 5, y:5}
            ]
        })
        setTimeout(this.addSnakedSquare, 1000)
    }

    addSnakedSquare() {
        let lastSnakedSquare = this.state.snake[this.state.snake.length - 1]
        this.setState({
            snake: [].concat(this.state.snake).concat([
                {x: lastSnakedSquare.x + 1, y: lastSnakedSquare.y + 1}
            ])
        })
        setTimeout(this.addSnakedSquare, 1000);
    }
}

Map.propTypes = {
    nbLine: PropTypes.number.isRequired,
    nbCol: PropTypes.number.isRequired
}

export default Map