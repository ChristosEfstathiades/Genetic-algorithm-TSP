let cities = []
let totalCities = 6

let recordDistance;

function setup() {
    createCanvas(400,300)
    for (let i = 0; i < totalCities; i++) {
        let v = createVector(random(width), random(height))   
        cities[i] = v
    }

    let d = calcDistance(cities)
    recordDistance = d
    bestEver = cities.slice()
}

function draw() {
    background(0)
    fill(255)
    for (let i = 0; i < cities.length; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8)
    }

    stroke(255)
    strokeWeight(1)
    noFill()
    beginShape()
    for (let i = 0; i < cities.length; i++) {
        vertex(cities[i].x, cities[i].y)
    }
    endShape()

    stroke(255, 40, 255)
    strokeWeight(4)
    noFill()
    beginShape()
    for (let i = 0; i < bestEver.length; i++) {
        vertex(bestEver[i].x, bestEver[i].y)
    }
    endShape()

    let i = floor(random(cities.length))
    let j = floor(random(cities.length))
    swap(cities, i, j)

    let d = calcDistance(cities)
    if (d < recordDistance) {
        recordDistance = d
        bestEver = cities.slice()
        console.log(recordDistance)
    }
}

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function calcDistance(points) {
    let sum = 0
    for (let x = 0; x < points.length-1; x++) {
        let i = points[x]
        let j = points[x + 1]
        let d = dist(i.x, i.y, j.x, j.y)
        sum += d
    }
    return sum
}