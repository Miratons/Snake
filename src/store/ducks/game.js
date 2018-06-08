import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, delay } from 'rxjs/operators';
import { NEVER } from 'rxjs'
import { of } from 'rxjs/index'

import { moveSnake } from 'store/ducks/snake'
import { getRandomFood } from 'service/FoodService'

//Actions
export const SET_NBLINE = 'snakie/GAME/SET_NBLINE'
export const SET_NBCOL = 'snakie/GAME/SET_NBCOL'
export const SET_TIMER = 'snakie/GAME/SET_TIMER'
export const SET_START = 'snakie/GAME/SET_START'
export const SET_OVER = 'snakie/GAME/SET_OVER'
export const SET_FOOD = 'snakie/GAME/SET_FOOD'
export const INCREMENT_ROUND = 'snakie/GAME/INCREMENT_ROUND'
// Actions Epics
export const GAME_OVER = 'snakie/GAME/GAME_OVER'
export const START_GAME = 'snakie/GAME/START_GAME'
export const NEXT_ROUND = 'snakie/GAME/NEXT_ROUND'
export const UPDATE_FOOD = 'snakie/GAME/UPDATE_FOOD'


// Reducer
const initial = {
    nbLine: 10,
    nbCol: 20,
    timer: 500,
    round: 1,
    food: {},
    isStart: false,
    isOver: false,
}

export default function reducer (state = initial, action = {}) {
    switch (action.type) {
        case SET_NBLINE:
            return {
                ...state,
                nbLine: action.nbLine
            }
            break

        case SET_NBCOL:
            return {
                ...state,
                nbCol: action.nbCol
            }
            break

        case SET_TIMER:
            return {
                ...state,
                timer: action.timer
            }
            break

        case SET_START:
            return {
                ...state,
                isStart: action.isStart
            }
            break

        case SET_OVER:
            return {
                ...state,
                isOver: action.isOver
            }
            break

        case SET_FOOD:
            return {
                ...state,
                food: action.food
            }
            break

        case INCREMENT_ROUND:
            return {
                ...state,
                round: state.round + 1
            }
            break
        
        
        default:
            return state
    }
}

// Actions creators
export const setNbLine = (nbLine) => ({
    type: SET_NBLINE,
    nbLine
})

export const setNbCol = (nbCol) => ({
    type: SET_NBCOL,
    nbCol
})

export const setTimer = (timer) => ({
    type: SET_TIMER,
    timer
})

export const setStart = (isStart) => ({
    type: SET_START,
    isStart
})

export const setOver = (isOver) => ({
    type: SET_OVER,
    isOver
})

export const setFood = (food) => ({
    type: SET_FOOD,
    food
})

export const incrementRound = () => ({
    type: INCREMENT_ROUND
})

export const gameOver = () => ({type: GAME_OVER})

export const startGame = () => ({type: START_GAME})

export const nextRound = () => ({type: NEXT_ROUND})

export const updateFood = () => ({type: UPDATE_FOOD})

// Epics
const gameOverEpic = (action$, state$) => 
    action$.pipe(
        ofType(GAME_OVER),
        mergeMap(() => {
            return of(setOver(true))
        })
    )

const startGameEpic = (action$, state$) =>
    action$.pipe(
        ofType(START_GAME),
        mergeMap(() => {
            if (!state$.value.game.isStart && !state$.value.game.isOver) {
                return of(updateFood(), setStart(true), moveSnake())
            }
            return NEVER
        })
    )

const nextRoundEpic = (action$, state$) =>
    action$.pipe(
        ofType(NEXT_ROUND),
        delay(state$.value.game.timer),
        mergeMap(() => {
            return of(updateFood(), incrementRound(), moveSnake())
        })
    )

const updateFoodEpic = (action$, state$) =>
    action$.pipe(
        ofType(UPDATE_FOOD),
        mergeMap(() => {
            let food = state$.value.game.food
            if (!food || food.x === undefined ) {
                food = getRandomFood(state$.value.snake.snake, state$.value.game.nbCol, state$.value.game.nbLine)
                return of(setFood(food))
            }
            return NEVER
        })
    )


export const epic = combineEpics(
    gameOverEpic,
    startGameEpic,
    nextRoundEpic,
    updateFoodEpic
)