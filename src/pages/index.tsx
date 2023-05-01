import useSwr from 'swr'

import { fetcher } from '@/shared/fetcher'
import { BasicLayout } from '@/layouts/basic.layout'

export default function Home() {
  const { data, error, isLoading } = useSwr('/posts', (url) => fetcher.get(url))

  return (
    <BasicLayout>
      <div></div>
    </BasicLayout>
  )
}
