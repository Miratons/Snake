import React, { Component } from 'react'
import PropTypes from 'prop-types'

import 'components/Square.css'

class Square extends Component {
    constructor(props) {
        super(props);
        this.getClassName = this.getClassName.bind(this)
    }

    render() {
        
        return (
            <li className={this.getClassName()}></li>
       )
    }

    getClassName() {
        let className = "square"
        let index = this.props.snake.findIndex((pos) => pos.x === this.props.x && pos.y === this.props.y)
        if (index !== -1) {
            className += index === 0 ? ' headSnake' : ' snaked'
        }
        return className;
    }
}

Square.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    snake: PropTypes.array.isRequired,
}

export default Square