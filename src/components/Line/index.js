import { connect } from 'react-redux'
import Line from './presentational'

const mapStateToProps = (state) => ({
    nbCol: state.game.nbCol
})

export default connect(mapStateToProps)(Line)