// SnakeService.js
export const getUpdateHeadSnake = (head, nextAxe, axe) => {
    var headSnake = Object.assign({}, head)
    let newAxe = nextAxe ? nextAxe : axe
    switch (newAxe) {
        case "top":
            headSnake.x--
            break
        
        case "right":
            headSnake.y++
            break
        
        case "bottom":
            headSnake.x++
            break

        case "left":
            headSnake.y--
            break
        
        default:
            break
    }
    return headSnake
}

export const getUpdateSnake = (headSnake, snack) => {
    // move all snak square
    let snake = [headSnake];
    for (let i = 1; i < snake.length; i++) {
        snake.push(snake[i - 1])
    }
    return snake
}