let cities = []
let totalCities = 10

let order = [];

let recordDistance;

function setup() {
    createCanvas(600,600)
    for (let i = 0; i < totalCities; i++) {
        let v = createVector(random(width), random(height / 2))   
        cities[i] = v
        order[i] = i
    }

    let d = calcDistance(cities, order)
    recordDistance = d
    bestEver = order.slice()
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
    for (let i = 0; i < order.length; i++) {
        let n = order[i]
        vertex(cities[n].x, cities[n].y)
    }
    endShape()

    stroke(255, 40, 255)
    strokeWeight(4)
    noFill()
    beginShape()
    for (let i = 0; i < order.length; i++) {
        let n = bestEver[i]
        vertex(cities[n].x, cities[n].y)
    }
    endShape()

    let d = calcDistance(cities, order)
    if (d < recordDistance) {
        recordDistance = d
        bestEver = order.slice()
        console.log(recordDistance)
    }

    textSize(64)
    let s = ''
    for (let i = 0; i < order.length; i++) {
        s += order[i]
    }
    fill(255)
    text(s, 20, height - 64)

    nextOrder();
}

function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

function calcDistance(points, order) {
    let sum = 0
    for (let x = 0; x < order.length-1; x++) {
        let i = points[order[x]]
        let j = points[order[x + 1]]
        let d = dist(i.x, i.y, j.x, j.y)
        sum += d
    }
    return sum
}


//lexical algo
function nextOrder() {
    let largestI = -1
    for (let i = 0; i < order.length - 1; i++) {
        if (order[i] < order[i+1]) {
            largestI = i
        }
    }
    if (largestI == -1) {
        noLoop()
        console.log('finished')
    }
    
    var largestJ = -1
    for (let j = 0; j < order.length; j++) {
        if (order[largestI] < order[j]) {
            largestJ = j
        }
    }
    
    swap(order, largestI, largestJ)
    
    //reverse from largestI + 1 to the end
    let endArray = order.splice(largestI + 1)
    endArray.reverse()
    order = order.concat(endArray)
}

