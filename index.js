const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
  width: canvas.width / 4,
  hieght: canvas.height / 4,
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        }),
      )
    }
  })
})

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 16,
            y: y * 16,
          },
        }),
      )
    }
  })
})

const gravity = 0.5

const player = new Player({
  position: {
    x: 100,
    y: 0,
  },
  collisionBlocks,
})

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: './img/background.png',
})

function animate() {
  window.requestAnimationFrame(animate)
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.save()
  ctx.scale(4, 4)
  ctx.translate(0, -background.image.height + scaledCanvas.hieght)
  background.update()

  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update()
  })

  platformCollisionBlocks.forEach((block) => {
    block.update()
  })

  player.update()

  player.velocity.x = 0
  if (keys.d.pressed) player.velocity.x = 5
  else if (keys.a.pressed) player.velocity.x = -5

  ctx.restore()
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
      player.velocity.y = -8
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
