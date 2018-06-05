import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'components/Square.css'

class Square extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.getClassName = this.getClassName.bind(this)
    }

    render() {
        
        return (
            <li className={this.getClassName()}>
                <input type="text" onKeyPress={this.handleKeyPress} />
            </li>
       )
    }

    handleKeyPress(event) {
        console.log(event, this.props);
    }

    getClassName() {
        let className = "square "
        let isSnaked = this.props.snake.find((pos) => pos.x === this.props.x && pos.y === this.props.y)
        className += isSnaked ? 'snaked' : ''
        if (isSnaked) console.log(className)
        return className;
    }
}

Square.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    snake: PropTypes.array.isRequired,
}

export default Square