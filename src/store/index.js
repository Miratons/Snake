import { createStore, combineReducers } from 'redux'
import * as snake from 'store/ducks/snake'
import * as game from 'store/ducks/game'
// import * as todos from 'store/ducks/todos'

const rootReducer = combineReducers({
    snake: snake.default,
    game: game.default
})

const store = createStore(rootReducer)

export default store