import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import * as snake from 'store/ducks/snake'
import * as game from 'store/ducks/game'

const rootReducer = combineReducers({
    snake: snake.default,
    game: game.default
})

const rootEpic = combineEpics(
    snake.epic,
    game.epic
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

export default store