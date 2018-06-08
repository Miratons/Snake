import { connect } from 'react-redux'
import Map from './presentational'

import { updateAxe } from 'store/ducks/snake'
import { store } from 'store'

const mapStateToProps = (state) => ({
    nbLine: state.game.nbLine
})

const mapDispatchToProps = (dispatch) => {
    return {
        updateAxe : (value) => dispatch(updateAxe(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)