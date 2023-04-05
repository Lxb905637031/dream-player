import { 
  useEffect, 
  useRef, 
  useState, 
  ChangeEventHandler
} from 'react'
import {
  useVisual
} from './hooks/index'
import Header from './components/Header'
import Player from './components/Player'
import PlayList from './components/PlayList'

import '@/assets/style/index.less'

import audioList from './constants/index'
import { IPlayItem } from './constants/type'

import { padLeft } from './utils/index'

function App() {
  // 播发列表
  const [playList, setPlayList] = useState<IPlayItem[]>(audioList)
  // 当前播放audio
  const [currentAudio, setCurrentAudio] = useState<IPlayItem>(audioList[0])
  // 当前播放时间
  const [currentTime, setCurrentTime] = useState<string>('00:00')

  const audioRef = useRef<HTMLAudioElement>(null)

  const {
    visualize,
    resetCanvas,
    stopVisualize
  } = useVisual('canvas', 50)

  // 暂停
  const onPause = () => {
    resetCanvas()
  }

  // 播放
  const onPlay =  async () => {
    if (audioRef.current) {
      stopVisualize()
      await audioRef.current.play()
      const audioEle = audioRef.current as any
      // 流
      const stream = audioEle.mozCaptureStream ? audioEle.mozCaptureStream() : audioEle.captureStream()
      visualize(stream)
    }
  }

  const onUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const [file] = e.target.files
      const blobUrl = URL.createObjectURL(file)
      const [filename] = file.name.split('.')
      setCurrentAudio({
        name: filename,
        url: blobUrl
      })
      setPlayList([
        ...playList,
        {
          name: filename,
          url: blobUrl
        }
      ])
    }
  }

  useEffect(() => {
    resetCanvas()

    return () => {
      stopVisualize()
    }
  },[])

  useEffect(() => {
    const timer = setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime
        const min = Math.floor(currentTime / 60)
        const sec = Math.floor(currentTime % 60)
        setCurrentTime(`${padLeft(min)}:${padLeft(sec)}`)
      }
    })

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="App">
      <div className="player-wrapper">
        <Header>
          <span>正在播放: { currentAudio.name }</span>
          <span style={{ marginLeft: "auto" }}>{ currentTime }</span>
        </Header>
        <Player
          ref={ audioRef }
          onPause={ onPause }
          onPlay={ onPlay }
          playItem={ currentAudio }
        />
      </div>
      <div className="playlist-wrapper">
        <Header>
          播放列表
        </Header>
        <PlayList
          playList={ playList }
          playItem={ currentAudio }
          onUpload={ onUpload }
          setPlayItem={ setCurrentAudio }
        />
      </div>
    </div>
  )
}

export default App
