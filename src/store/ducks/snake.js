import { NEVER } from "rxjs";

import { getUpdateHeadSnake, getUpdateSnake } from 'service/SnakeService'

// Actions
export const SET_SNAKE = 'my-todo/FILTERS/SET_SNAKE'
export const SET_AXE = 'my-todo/FILTERS/SET_AXE'
export const SET_NEXT_AXE = 'my-todo/FILTERS/SET_NEXT_AXE'
// Actions Epics
export const MOVE_SNAKE = 'my-todo/FILTERS/MOVE_SNAKE'

// Reducer
const initial = {
    snake: [
        {x: 4, y:5},
        {x: 5, y:5},
        {x: 6, y:5},
        {x: 7, y:5},
        {x: 8, y:5},
        {x: 9, y:5}
    ],
    axe: null,
    nextAxe: null,
}

export default function reducer (state = initial, action = {}) {
    switch (action.type) {
        case SET_SNAKE:
            return {
                ...state,
                snake: action.snake
            }
            break
        
        case SET_AXE:
            return {
                ...state,
                axe: action.axe
            }
            break

        case SET_NEXT_AXE:
            return {
                ...state,
                axe: action.axe
            }
            break
        
        default:
            return state
    }
}

// Actions creators
export const setSnake = (snake) => ({
    type: SET_SNAKE,
    snake
})

export const setAxe = (axe) => ({
    type: SET_AXE,
    axe
})

export const setNextAxe = (nextAxe) => ({
    type: SET_NEXT_AXE,
    nextAxe
})

const moveSnackEpic = (action$, state$) => {
    action$.pipe(
        ofType("MOVE_SNAKE"),
        mergeMap(() => {
            let headSnake = getUpdateHeadSnake(state$.snake.snake[0], state$.snake.axe, state$.snake.nextAxe)
            // stop game if snak out of map or eat him
            let lastSnackWithoutHead = [].concat(state$.snake.snake)
            lastSnackWithoutHead.splice(0, 1)
            let index = lastSnackWithoutHead.findIndex((pos) => pos.x === headSnake.x && pos.y === headSnake.y)
            if (index !== -1 
                || headSnake.x < 0 || headSnake.x >= state$.game.nbCol
                || headSnake.y < 0 || headSnake.y >= state$.game.nbLine) {
                return of(gameOver())
            }
            // update all snake 
            let snake = getUpdateSnake(headSnake, state$.snake.snake)
            return of(setSnake(snake))
        })
    )
}