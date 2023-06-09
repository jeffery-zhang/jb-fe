import { FC, useMemo, useState } from 'react'
import zhHans from 'bytemd/locales/zh_Hans.json'
import { Editor as BytemdEditor } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import highlight from '@bytemd/plugin-highlight'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/default.css'

import { uploadContentImg } from '@/shared/services/common.service'
import { IEditorProps } from '@/shared/interfaces/form.interface'

export const Editor: FC<IEditorProps> = ({ value, onChange }) => {
  const [val, setVal] = useState('')
  const plugins = useMemo(
    () => [gfm(), frontmatter(), highlight(), gemoji(), breaks()],
    [],
  )

  return (
    <div className='mb-8 lg:mb-10'>
      <BytemdEditor
        value={value || val}
        onChange={(v) => {
          setVal(v)
          onChange?.(v)
        }}
        plugins={plugins}
        locale={zhHans}
        uploadImages={async (files) => {
          const { data, success } = await uploadContentImg({ file: files[0] })
          if (success) return [{ url: data }]
          return []
        }}
      />
    </div>
  )
}
