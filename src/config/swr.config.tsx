import { FC, ReactNode } from 'react'
import { SWRConfig } from 'swr'

export const SwrGlobalConfig: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        loadingTimeout: 5000,
        errorRetryInterval: 1000,
        errorRetryCount: 5,
      }}
    >
      {children}
    </SWRConfig>
  )
}
