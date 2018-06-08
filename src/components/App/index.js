import { connect } from 'react-redux'
import App from './presentational'

const mapStateToProps = (state) => ({
    snake: state.snake.snake,
    isOver: state.game.isOver
})

export default connect(mapStateToProps)(App)