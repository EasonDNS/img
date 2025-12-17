// 创建一个汽泡函数  返回一个定时器
const createBubble = (
  canvas: HTMLCanvasElement,
  n = 100,
  width = window.innerWidth,
  height = window.innerHeight
) => {
  const num = n //气泡数量
  const ballX: any[] = [] //球心的横坐标
  const ballY: any[] = [] //球心的纵坐标
  const ballR: any[] = [] //球的半径
  const ballF: any[] = [] //小球左右摆动幅度
  const speed: any[] = [] //小球向上移动速度
  const finalCol: any[] = []
  let reX
  let reY
  const ballK: any[] = []
  const w = width
  const h = height
  canvas.width = w
  canvas.height = h

  const context = canvas.getContext('2d')
  for (let i = 0; i < num; i++) {
    const radius = Math.floor(Math.random() * 15 + 10)
    const x = Math.floor(Math.random() * canvas.offsetWidth)
    const y = Math.floor(Math.random() * h)
    const fudu = Math.floor(Math.random() * 10 + 5)
    const sp = Math.floor(Math.random() * 30 + 5)
    // let color = colours[Math.floor(Math.random() * colours.length)]
    // 随机生成 颜色值
    const rgba = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
      Math.random() * 255
    )},${Math.floor(Math.random() * 255)},${Math.random() * 1})`

    ballX.push(x)
    ballY.push(y)
    ballR.push(radius)
    ballF.push(fudu)
    speed.push(sp)
    finalCol.push(rgba)
  }
  const move = () => {
    context?.clearRect(0, 0, w, h)
    for (let i = 0; i < num; i++) {
      if (ballK[i] == null) {
        ballK[i] = 0
      }
      reX = ballK[i] * speed[i] + ballY[i]
      reY = Math.sin(ballK[i]) * ballF[i] + ballX[i]
      if (reX + ballR[i] <= 0) {
        ballY[i] = h
        ballK[i] = 0
        reX = ballK[i] * speed[i] + ballY[i]
      }
      context!.beginPath()
      context!.fillStyle = finalCol[i]
      context!.globalAlpha = 0.5
      context!.arc(reY, reX, ballR[i], 0, Math.PI * 2, false)
      context!.fill()
      ballK.splice(i, 1, ballK[i])
      ballK[i] -= 0.1
    }
  }
  const timer = setInterval(move, 30)
  return timer
}
export { createBubble }
