// FoodService
export const getRandomFood = (snake, maxX, maxY) => {
    let food = {
        x: getRandomInt(maxX),
        y: getRandomInt(maxY)
    }
    let index = snake.findIndex((pos) => pos.x === food.x && pos.y === food.y)
    return index === -1 ? food : getRandomFood(snake, maxX, maxY)
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}