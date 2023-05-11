import Image, { ImageProps } from 'next/image'
import { FC, useMemo } from 'react'

import LoadImgFailed from '../../public/imgs/load-img-failed.jpg'

interface IProps extends ImageProps {
  shouldRender?: boolean
}

export const Img: FC<IProps> = ({ src, shouldRender = true, ...rest }) => {
  const validateSrc = () => {
    if (typeof src === 'string') {
      return src.startsWith('http') || src.startsWith('/')
    }
    return true
  }
  const imgSrc = useMemo(() => {
    return validateSrc() ? src : LoadImgFailed
  }, [src])

  return shouldRender || validateSrc() ? <Image src={imgSrc} {...rest} /> : null
}
