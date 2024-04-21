const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.5

class Player {
  constructor(position) {
    this.position = position
    this.velocity = {
      x: 0,
      y: 1, // the force of gravity!
    }
    this.height = 100
  }

  draw() {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.position.x, this.position.y, 100, this.height)
  }

  update() {
    this.draw()

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y < canvas.height)
      this.velocity.y += gravity
    else this.velocity.y = 0
  }
}

const player = new Player({
  x: 0,
  y: 0,
})

const player2 = new Player({
  x: 300,
  y: 100,
})

function animate() {
  window.requestAnimationFrame(animate)
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  player2.update()

  player.velocity.x = 0
  if (keys.d.pressed) player.velocity.x = 5
    else if (keys.a.pressed) player.velocity.x = -5
}

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
}

animate()

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd': // RIGHT
      keys.d.pressed = true
      break
    case 'a': // LEFT
      keys.a.pressed = true
      break
    case 'w': // JUMP
      player.velocity.y = -20
      break
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd': // RIGHT
      keys.d.pressed = false
      break
    case 'a': // LEFT
      keys.a.pressed = false
      break
  }
})
