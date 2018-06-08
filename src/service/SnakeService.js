// SnakeService.js
export const getUpdateHeadSnake = (head, nextAxe, axe) => {
    var headSnake = Object.assign({}, head)
    let newAxe = nextAxe ? nextAxe : axe
    switch (newAxe) {
        case "top":
            headSnake.y--
            break
        
        case "right":
            headSnake.x++
            break
        
        case "bottom":
            headSnake.y++
            break

        case "left":
            headSnake.x--
            break
        
        default:
            break
    }
    return headSnake
}

export const getUpdateSnake = (headSnake, snake) => {
    // move all snak square
    let newSnake = [headSnake];
    for (let i = 1; i < snake.length; i++) {
        newSnake.push(snake[i - 1])
    }
    return newSnake
}