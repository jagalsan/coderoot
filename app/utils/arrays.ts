export function randomize(arr: any, n: number) {
    const arrCopy = [...arr]
    const result = []

    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * arrCopy.length)
        const randomItem = arrCopy.splice(randomIndex, 1)[0]
        result.push(randomItem)
    }

    return result
}
