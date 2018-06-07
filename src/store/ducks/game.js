//Actions
export const SET_NBLINE = 'my-todo/FILTERS/SET_NBLINE'
export const SET_NBCOL = 'my-todo/FILTERS/SET_NBCOL'
export const SET_TIMER = 'my-todo/FILTERS/SET_TIMER'
export const SET_START = 'my-todo/FILTERS/SET_START'
export const SET_OVER = 'my-todo/FILTERS/SET_OVER'

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
    type: SET_TIMER,
    isStart
})

export const setOver = (isOver) => ({
    type: SET_TIMER,
    isOver
})

const gameOverEpic = (action$, state$) => {
    action$.pipe(
        ofType("GAME_OVER"),
        mergeMap(() => {
            return of(setOver(true))
        })
    )
}