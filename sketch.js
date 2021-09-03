const w = 5000
let N = 6;　// 多角形数
let R = 180; //　多角形が接っする円の半径

// Color Scheme (light, dark)
const colorSchemes = []
// Blue
colorSchemes[0] = ["#0fb4e1", "#07a0dc"]
// Red
colorSchemes[1] = ["#f54341", "#c81211"]
// Gold
colorSchemes[2] = ["#f0d588", "#e9cb82"]

function setup() {
  createCanvas(w, w, SVG)
  angleMode(DEGREES)
  noStroke()
  // colorScheme = random(colorSchemes)
  colorScheme = colorSchemes[2]
  background(colorScheme[0])
}

function draw() {
  let a = calcPolygonSide() // 多角形の辺の長さ
  let dy = a * sin(45 - 90 / N)
  let dx
  let p = w / 50 // 図形同士の隙間

  stroke(colorScheme[1])
  strokeWeight( w / 200 )
  noFill()
  for ( let y = 0; y < w + dy + p; y += dy + p) {
    for ( let x = 0; x < w + R * 2 + a + p; x += R * 2 + a + p) {
      y / (dy + p) % 2 === 0 ? dx = 0 : dx =  a / 2 + R + p / 2
        drawPolygon(x + dx , y)
    }
  }
  // save("kikkou_02.svg");
  // print("saved svg");
  // noLoop();
}

// 正多角形の計算式（http://blog.livedoor.jp/reona396/archives/55768147.html）

function drawPolygon(x, y) {
  push()
  translate(x, y)
  beginShape()
  for (let theta = 0; theta < 360; theta++) {
    let pos = calcPos(R, theta)

    let dx = pos[0]
    let dy = pos[1]
    vertex(dx, dy)
  }
  endShape(CLOSE)
  pop()
}

function calcPos(r, t) {
  let dx = r * cos(t) * func(t)
  let dy = r * sin(t) * func(t)

  return [dx, dy]
}

function func(t) {
  let A = cos(180 / N)
  let b = 360 / N
  let B = cos(b * ( t / b - floor( t / b ) ) - 180 / N)

  return A / B
}

//　多角形の一辺の長さ

function calcPolygonSide() {
  return 2 * R  * sin(180 / N)
}