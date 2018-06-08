import { connect } from 'react-redux'
import Square from './presentational'

const mapStateToProps = (state) => ({
    snake: state.snake.snake
})

export default connect(mapStateToProps)(Square)