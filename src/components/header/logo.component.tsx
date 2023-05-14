import { FC } from 'react'

export const Logo: FC<{ className?: string; onClick?: () => void }> = ({
  className,
  onClick,
}) => {
  return (
    <div
      className={`font-great-vibes tracking-widest cursor-default text-primary \
      ${className || ''}`}
      onClick={() => onClick?.()}
    >
      <span className='text-3xl md:text-4xl'>JB</span>
      <span className='text-base'>log</span>
    </div>
  )
}
