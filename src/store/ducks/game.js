import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, timeInterval, tap } from 'rxjs/operators';
import { NEVER } from 'rxjs'
import { of } from 'rxjs/index'

import { moveSnake } from 'store/ducks/snake'

//Actions
export const SET_NBLINE = 'snakie/GAME/SET_NBLINE'
export const SET_NBCOL = 'snakie/GAME/SET_NBCOL'
export const SET_TIMER = 'snakie/GAME/SET_TIMER'
export const SET_START = 'snakie/GAME/SET_START'
export const SET_OVER = 'snakie/GAME/SET_OVER'
// Actions Epics
export const GAME_OVER = 'snakie/GAME/GAME_OVER'
export const START_GAME = 'snakie/GAME/START_GAME'


// Reducer
const initial = {
    nbLine: 10,
    nbCol: 10,
    timer: 1000,
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

export const gameOver = () => ({type: GAME_OVER})

export const startGame = () => ({type: START_GAME})

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
        // tap(() => console.log(state$)),
        mergeMap(() => {
            if (!state$.value.game.isStart && !state$.value.game.isOver) {
                return of(setStart(true), moveSnake())
            }
            return NEVER
        })
    )


export const epic = combineEpics(
    gameOverEpic,
    startGameEpic
)