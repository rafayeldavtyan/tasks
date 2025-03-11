declare module "*.svg" {
  import { SVGProps } from 'react'
  const content: React.ComponentType<SVGProps<SVGSVGElement>>
  export default content
}

declare module '*.png' {
  const content: string
  export = content
}

declare module '*.jpg' {
  const content: string
  export = content
}

declare module '*.scss';
