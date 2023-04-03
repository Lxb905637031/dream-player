import { IPlayItem } from './type'

import clearDay from '@sources/晴天.mp3'
import weWay from '@sources/任我行.mp3'
import forset from '@sources/森林.mp3'
import prayOfMaiden from '@sources/少女的祈祷.mp3'
import personOfMind from '@sources/有心人.mp3'
import endOfWorld from '@sources/直到世界尽头.mp3'

const playList: IPlayItem[] = [
  {
    name: '晴天',
    url: clearDay,
    singer: '周杰伦'
  },
  {
    name: '任我行',
    url: weWay,
    singer: '陈奕讯'
  },
  {
    name: '森林',
    url: forset,
    singer: 'MR'
  },
  {
    name: '少女的祈祷',
    url: prayOfMaiden,
    singer: '杨千嬅'
  },
  {
    name: '有心人',
    url: personOfMind,
    singer: '张国荣'
  },
  {
    name: '直到世界尽头',
    url: endOfWorld,
    singer: 'WANDS'
  }
]

export default playList