import { connect } from 'react-redux'
import Mask from './presentational'

import { store } from 'store'

const mapStateToProps = (state) => ({
    isStart: state.game.isStart
})

export default connect(mapStateToProps)(Mask)