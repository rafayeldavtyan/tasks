import React from "react"

export type ObjectType = {
  [key:string]:
  | string
  | number
  | boolean
  | null
  | undefined
  | React.ReactNode
  | Iterable<React.ReactNode>
  | ObjectType[]
}

export type ArrayType = ObjectType[]
export type CallBackType = (...data: unknown[]) => void;