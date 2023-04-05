import { IPlayItem } from './type'

import weWay from '@sources/任我行.mp3'
import forset from '@sources/森林.mp3'

const playList: IPlayItem[] = [
  {
    name: '任我行',
    url: weWay,
    singer: '陈奕讯'
  },
  {
    name: '森林',
    url: forset,
    singer: 'MR'
  }
]

export default playList