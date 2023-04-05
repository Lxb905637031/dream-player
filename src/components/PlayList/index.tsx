import { FC, ReactEventHandler } from 'react'
import { IPlayItem } from '../../constants/type'

import './style/index.less'

interface IProps {
  playItem: IPlayItem;
  playList: IPlayItem[];
  setPlayItem: (playItem: IPlayItem) => void
  onUpload: ReactEventHandler<HTMLInputElement>
}

const playList: FC<IProps> = ({
  playItem,
  playList,
  setPlayItem,
  onUpload
}) => {
  return (
    <div className="list-wrapper">
      <ul className="list">
        {
          playList.map(({name, url, singer = '未知歌手'}, index) => {
            return (
              <li
                key={ name }
                className={ url === playItem.url ? 'active' : '' }
                onClick={ () => setPlayItem({ name, url, singer }) }
              >
                { index + 1 }. { singer + ' - ' + name } 
              </li>
            )
          })
        }
      </ul>
      <div className="uploader">
        <label>
          <span>添加</span>
          <input type="file" onChange={ onUpload } accept="audio/*" />
        </label>
      </div>
    </div>
  )
}

export default playList