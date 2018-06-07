import { connect } from 'react-redux'
import Map from './presentational'

const mapStateToProps = (state) => ({
    nbLine: state.game.nbLine
})

export default connect(mapStateToProps)(Map)