import { useRef } from 'react'
import {
  clearFloat,
  clearCanvas,
  drawFloatBlocks,
  drawBar
} from './utils'

const useVisual = (selector: string, length = 20) => {
  const audioCtxRef = useRef<AudioContext>()
  const analyserRef = useRef<AnalyserNode>()
  const requestAnimateFramedRef = useRef<number>()

  const drawEachFrame = (canvasEl: HTMLCanvasElement, dataArr: Uint8Array) => {
    requestAnimateFramedRef.current = requestAnimationFrame(() => {
      drawEachFrame(canvasEl, dataArr)
    })

    if (analyserRef.current) {
      // 读取数据
      analyserRef.current.getByteFrequencyData(dataArr)
      // 更新长度
      const bars = dataArr.slice(0, Math.min(length, dataArr.length))
      // 画图
      clearCanvas(canvasEl)
    
      drawBar(canvasEl, bars)
      drawFloatBlocks(canvasEl, bars)
    }
  }

  const visualize = (stream: MediaStream) => {
    const canvasEl: HTMLCanvasElement | null = document.querySelector(selector)

    if (!canvasEl) {
      return new Error('找不到 canvas')
    }

    // 创建解析器
    // https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext/AudioContext
    audioCtxRef.current = new AudioContext()
    // https://developer.mozilla.org/zh-CN/docs/Web/API/BaseAudioContext/createAnalyser
    analyserRef.current = audioCtxRef.current.createAnalyser()

    // 创建音频源
    // https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext/createMediaStreamSource
    const source = audioCtxRef.current.createMediaStreamSource(stream)
    // 音频源连接解析器
    source.connect(analyserRef.current)

    // @ts-ignore
    if (typeof InstallTrigger !== 'undefined') {
      source.connect(audioCtxRef.current.destination);
    }

    // 准备数据数组
    analyserRef.current.fftSize = 256
    // https://developer.mozilla.org/zh-CN/docs/Web/API/AnalyserNode/frequencyBinCount
    const bufferLength = analyserRef.current.frequencyBinCount
    const dataArr = new Uint8Array(bufferLength)

    // 递归画图
    drawEachFrame(canvasEl, dataArr)

  }

  // 停止
  const stopVisualize = () => {
    if (requestAnimateFramedRef.current) {
      window.cancelAnimationFrame(requestAnimateFramedRef.current)
      resetCanvas()
    }
  }

  // 重置
  const resetCanvas = () => {
    const canvasEl: HTMLCanvasElement | null = document.querySelector(selector)

    if (canvasEl) {
      const emptyDataArr = (new Uint8Array(length)).map(() => 0)
      clearFloat()
      clearCanvas(canvasEl)
      drawFloatBlocks(canvasEl, emptyDataArr)
    }
  }

  return {
    visualize,
    resetCanvas,
    stopVisualize,
    requestAnimateFrameId: requestAnimateFramedRef.current
  }
}

export {
  useVisual
}