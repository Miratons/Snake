import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Line from 'components/Line'

class Map extends Component {
    constructor(props) {
        super(props)
        // this.addSnakedSquare = this.addSnakedSquare.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    render() {
        var lines = [];
        for (let i = 0; i < this.props.nbLine; i++) {
            lines.push(<Line key={i} x={i} />);
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
        // this.init()
    }

    handleKeyPress(event) {

        // var newAxe;
        // let action = event.target.value ? event.target.value.substring(event.target.value.length - 1) : null
        // event.target.value = null
        // switch (action) {
        //     case "z":
        //         newAxe = "top"
        //         break;

        //     case "d":
        //         newAxe = "right"
        //         break;

        //     case "s":
        //         newAxe = "bottom"
        //         break;
            
        //     case "q":
        //         newAxe = "left"
        //         break;
            
        //     default:
        //         break;
        // }
        // // stock next direction in state
        // if (newAxe && !this.state.nextAxe) {
        //     this.setState({nextAxe: newAxe}, () => {
        //         // launch game if is first choice
        //         if (!this.state.isStart && !this.state.isOver) {
        //             this.start()
        //         }
        //     })
        // }
    }
}

Map.propTypes = {
    nbLine: PropTypes.number.isRequired,
}

export default Map