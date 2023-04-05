// 浮动小块
let floatBlocks: any = []

// 高度
const FLOAT_HEIGHT = 4
// 下落高度
const DROP_DISTANCE = 1
// 间隙
const BAR_GAP = 2

// 清除浮块
export const clearFloat = () => floatBlocks = []

// 清除画布
export const clearCanvas = (canvasEl: HTMLCanvasElement) => {
  const canvasWidth = canvasEl.width
  const canvasHeight = canvasEl.height
  const canvasCtx = canvasEl.getContext('2d')

  if (!canvasCtx) return

  // 绘制图形
  canvasCtx.fillStyle = 'rgb(29, 19, 62)'
  canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight)
}

// 画浮动小块
export const drawFloatBlocks = (canvasEl: HTMLCanvasElement, dataArr: Uint8Array) => {
  
  const canvasCtx = canvasEl.getContext('2d')
  const canvasWidth = canvasEl.width
  const canvasHeight = canvasEl.height

  if (!canvasCtx) return

  dataArr.forEach((item, index) => {
    floatBlocks[index] = floatBlocks[index] || FLOAT_HEIGHT
    
    const pushHeight = item + FLOAT_HEIGHT
    const dropHeight = floatBlocks[index] - DROP_DISTANCE

    floatBlocks[index] = Math.max(pushHeight, dropHeight)
  })

  // 浮块的宽度
  const floatWidth = canvasWidth / dataArr.length

  // x坐标记录值
  let x = 0

  floatBlocks.forEach((float: number) => {
    const floatHeight = float

    
    canvasCtx.fillStyle = '#3e47a0'
    canvasCtx.fillRect(x, canvasHeight - floatHeight, floatWidth, FLOAT_HEIGHT)

    // 每次遍历x坐标往右移
    x += floatWidth + BAR_GAP
  })

}

// 画柱形图
export const drawBar = (canvasEl: HTMLCanvasElement, dataArr:Uint8Array) => {
  const canvasCtx = canvasEl.getContext('2d')
  const canvasWidth = canvasEl.width
  const canvasHeight = canvasEl.height

  if (!canvasCtx) return

  // 柱形宽度
  const barWidth = canvasWidth / dataArr.length
  // x坐标
  let x = 0

  dataArr.forEach((item) => {
    const barHeight = item

    // 添加渐变色
    // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createLinearGradient
    const gradient = canvasCtx.createLinearGradient(canvasWidth / 2, canvasHeight / 2, canvasWidth / 2, canvasHeight)
    gradient.addColorStop(0, '#68b3ec')
    gradient.addColorStop(0.5, '#4b5fc9')
    gradient.addColorStop(1, '#68b3ec')

    // 画bar
    canvasCtx.fillStyle = gradient
    canvasCtx.fillRect(x, canvasHeight - barHeight, barWidth, barHeight)

     // 每次遍历x坐标往右移
     x += barWidth + BAR_GAP
  })
}