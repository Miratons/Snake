import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Mask.css'

class Mask extends Component {

    render() {
        return !this.props.isStart ? (
            <div className="informations">
                <div className="information-bg"></div>
                <p>Veuillez cliquer sur la grille et choisissez une direction à l'aide des touches Z, Q, S, D pour lancer le Snake</p>
            </div>
        ) : (
            <div></div>
        )
    }
}

Mask.propTypes = {
    isStart: PropTypes.bool.isRequired
}

export default Mask