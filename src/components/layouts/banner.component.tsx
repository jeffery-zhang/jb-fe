import { FC } from 'react'
import useSWR from 'swr'

import { Img } from '@/components/image.component'
import { getBanners, path } from '@/shared/services/settings.service'
import { useSettingsStore } from '@/shared/stores/settings.store'

export const Banner: FC = () => {
  const banner = useSettingsStore((state) => state.banner)
  const { data = [] } = useSWR(path.allBanners, async () => {
    const { success, data } = await getBanners()
    if (success) {
      return data
    }
  })

  return (
    <div className='w-full h-64 lg:h-full absolute'>
      {data.map(({ name, bannerUrl }) => (
        <Img
          className={`w-full h-full object-cover ${
            banner === name ? 'block' : 'hidden'
          }`}
          key={name}
          src={bannerUrl}
          alt='banner'
          width={3000}
          height={1800}
        />
      ))}
      <div className='absolute -bottom-1 w-full h-full bg-gradient-to-b from-transparent to-base-200'></div>
    </div>
  )
}
