import { forwardRef, Ref } from 'react'
import { IPlayItem } from '../../constants/type'

import './style/index.less'

interface IProps {
  onPlay: () => void;
  onPause: () => void;
  playItem: IPlayItem;
}

const Player = forwardRef((props: IProps, audioRef: Ref<HTMLAudioElement>) => {
  const { playItem, onPlay, onPause } = props

  return (
    <div className="player">
      <div className="canvas">
        <canvas 
          id="canvas" 
          width={500} 
          height={300}
        />
      </div>
      <div className="controls">
        <audio 
          ref={ audioRef } 
          src={ playItem.url } 
          onPlay={ onPlay } 
          onPause={ onPause } 
          controls
        />
      </div>
    </div>
  )
})
export default Player