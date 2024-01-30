import React from "react"
import { memo, ReactNode } from "react"
import type { FC } from "react"

export interface IProps {
  children?: ReactNode
}

// memo浅层比较
const Face: FC<IProps> = memo(function (props) {
  // const { children } = props

  return (
    <div className="p-5">
      <h2>Face</h2>
    </div>
  )
})

export default Face

// 设置一个方便调试的name 可以不写 默认为组件名称
Face.displayName = "Face"