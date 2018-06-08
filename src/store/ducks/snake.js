import { NEVER, interval } from "rxjs";
import { mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from "redux-observable";
import { of } from 'rxjs/index'

import { getUpdateHeadSnake, getUpdateSnake } from 'service/SnakeService'
import { startGame, gameOver, nextRound, setFood } from "store/ducks/game";

// Actions
export const SET_SNAKE = 'snakie/SNAKE/SET_SNAKE'
export const SET_AXE = 'snakie/SNAKE/SET_AXE'
export const SET_NEXT_AXE = 'snakie/SNAKE/SET_NEXT_AXE'
// Actions Epics
export const MOVE_SNAKE = 'snakie/SNAKE/MOVE_SNAKE'
export const UPDATE_AXE = 'snakie/SNAKE/UPDATE_AXE'

// Reducer
const initial = {
    snake: [
        {x: 4, y:5}
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
                nextAxe: action.axe
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

export const moveSnake = () => ({type: MOVE_SNAKE})

export const updateAxe = (value) => ({type: UPDATE_AXE, value})

// Epics
const moveSnackEpic = (action$, state$) => 
    action$.pipe(
        ofType(MOVE_SNAKE),
        mergeMap(() => {
            if (!state$.value.game.isOver) {
                let headSnake = getUpdateHeadSnake(state$.value.snake.snake[0], state$.value.snake.axe, state$.value.snake.nextAxe)
                // stop game if snak out of map or eat him
                let lastSnackWithoutHead = [].concat(state$.value.snake.snake)
                lastSnackWithoutHead.splice(0, 1)
                let index = lastSnackWithoutHead.findIndex((pos) => pos.x === headSnake.x && pos.y === headSnake.y)
                if (index !== -1 
                    || headSnake.x < 0 || headSnake.x >= state$.value.game.nbCol
                    || headSnake.y < 0 || headSnake.y >= state$.value.game.nbLine) {
                    return of(gameOver())
                }
                // update all snake 
                let snake = getUpdateSnake(headSnake, state$.value.snake.snake)
                let food = {...state$.value.game.food}
                if (headSnake.x === state$.value.game.food.x && headSnake.y === state$.value.game.food.y) {
                    snake = [food].concat(snake)
                    food = {}
                }
                return of(setSnake(snake), setFood(food), nextRound())
            }
            return NEVER
        })
    )

const updateAxeEpic = (action$, state$) =>
    action$.pipe(
        ofType(UPDATE_AXE),
        mergeMap((data) => {
            var newAxe;
            let action = data.value ? data.value.substring(data.value.length - 1) : null
            switch (action) {
                case "z":
                    newAxe = "top"
                    break;

                case "d":
                    newAxe = "right"
                    break;

                case "s":
                    newAxe = "bottom"
                    break;
                
                case "q":
                    newAxe = "left"
                    break;
                
                default:
                    break;
            }
            // stock next direction in state
            if (newAxe && !state$.value.snake.nextAxe) {
                return of(setAxe(newAxe), setNextAxe(null), startGame())
            }
            return NEVER
        })
    )


export const epic = combineEpics(
    moveSnackEpic,
    updateAxeEpic
)
