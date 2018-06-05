import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Line from 'components/Line'

class Map extends Component {
    constructor(props) {
        super(props)
        this.init = this.init.bind(this)
        this.start = this.start.bind(this)
        this.moveSnake = this.moveSnake.bind(this)
        this.gameOver = this.gameOver.bind(this)
        this.addSnakedSquare = this.addSnakedSquare.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)

        this.state = {
            snake: [],
            axe: null,
            nextAxe: null,
            isStart: false,
            isOver: false
        }
    }

    render() {
        var lines = [];
        for (let i = 0; i < this.props.nbLine; i++) {
            lines.push(<Line key={i} nbCol={this.props.nbCol} x={i} snake={this.state.snake} />);
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
        this.init()
    }

    init() {
        this.setState({
            snake: [
                {x: 4, y:5},
                {x: 5, y:5},
                {x: 6, y:5},
                {x: 7, y:5},
                {x: 8, y:5},
                {x: 9, y:5}
            ]
        })
    }

    start() {
        this.setState({isStart: true})
        this.moveSnake()
    }

    moveSnake() {
        var headSnake = Object.assign({}, this.state.snake[0])
        let newAxe = this.state.nextAxe ? this.state.nextAxe : this.state.axe
        this.setState({
            // update new axe
            axe: newAxe,
            // reset next axe
            nextAxe: null
        })
        switch (newAxe) {
            case "top":
                headSnake.x--
                break
            
            case "right":
                headSnake.y++
                break
            
            case "bottom":
                headSnake.x++
                break

            case "left":
                headSnake.y--
                break
            
            default:
                break
        }
        // stop game if snak out of map or eat him
        let lastSnackWithoutHead = [].concat(this.state.snake)
        lastSnackWithoutHead.splice(0, 1)
        let index = lastSnackWithoutHead.findIndex((pos) => pos.x === headSnake.x && pos.y === headSnake.y)
        if (index !== -1 
            || headSnake.x < 0 || headSnake.x >= this.props.nbCol
            || headSnake.y < 0 || headSnake.y >= this.props.nbLine) {
            this.gameOver()
            return
        }
        // move all snak square
        let snake = [headSnake];
        for (let i = 1; i < this.state.snake.length; i++) {
            snake.push(this.state.snake[i - 1])
        }
        this.setState({snake: snake})
        // continue game
        setTimeout(this.moveSnake, this.props.timer)
    }

    gameOver() {
        this.setState({isOver: true})
        console.log("End Game")
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

    handleKeyPress(event) {
        var newAxe;
        let action = event.target.value ? event.target.value.substring(event.target.value.length - 1) : null
        event.target.value = null
        switch (action) {
            case "z":
                newAxe = "top"
                break;

            case "d":
                newAxe = "right"
                break;

            case "s":
                newAxe = "bottom"
                break;
            
            case "q":
                newAxe = "left"
                break;
            
            default:
                break;
        }
        // stock next direction in state
        if (newAxe && !this.state.nextAxe) {
            this.setState({nextAxe: newAxe}, () => {
                // launch game if is first choice
                if (!this.state.isStart && !this.state.isOver) {
                    this.start()
                }
            })
        }
    }
}

Map.propTypes = {
    nbLine: PropTypes.number.isRequired,
    nbCol: PropTypes.number.isRequired,
    timer: PropTypes.number.isRequired
}

export default Map