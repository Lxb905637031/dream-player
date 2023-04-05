import { FC,  ReactNode } from 'react'
import './style/index.less'

interface IProps {
  children: ReactNode
}

const Header: FC<IProps> = ({ children }) => {
  return (
    <header className="header">
      { children }
    </header>
  )
}

export default Header
