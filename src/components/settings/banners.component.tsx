import { FC } from 'react'
import useSWR from 'swr'

import { Select } from '@/components/form'
import { getBanners, putOne, path } from '@/shared/services/settings.service'
import { useUserStore } from '@/shared/stores/user.store'
import { useSettingsStore } from '@/shared/stores/settings.store'

export const Banners: FC = () => {
  const isLogin = useUserStore((state) => state.isLogin)
  const { banner, ...rest } = useSettingsStore((state) => ({
    banner: state.banner,
    theme: state.theme,
    rounded: state.rounded,
  }))
  const setBanner = useSettingsStore((state) => state.setBanner)
  const { data = [] } = useSWR(path.allBanners, async () => {
    const { success, data } = await getBanners()
    if (success) {
      return data
    }
  })

  const onSelectBanner = async (val: string) => {
    if (!isLogin) return setBanner(val)
    const { success } = await putOne({ ...rest, banner: val })
    if (success) {
      setBanner(val)
    }
  }

  return (
    <div className='flex justify-center items-start w-full mb-12 lg:mb-16'>
      <label className='w-1/4 text-right'>Banner设置</label>
      <div className='flex-1 ml-4 lg:ml-8'>
        <Select
          options={data.map(({ name }) => ({
            label: name,
            value: name,
          }))}
          value={banner}
          onChange={onSelectBanner}
        />
      </div>
    </div>
  )
}
