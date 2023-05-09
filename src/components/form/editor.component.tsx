import { FC, useMemo } from 'react'
import zhHans from 'bytemd/locales/zh_Hans.json'
import { Editor as BytemdEditor } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import frontmatter from '@bytemd/plugin-frontmatter'
import highlight from '@bytemd/plugin-highlight'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import 'bytemd/dist/index.css'
import 'highlight.js/styles/default.css'

import { uploadFile } from '@/shared/services/common.service'
import { IFormEditorProps } from '@/shared/interfaces/form.interface'

export const Editor: FC<IFormEditorProps> = ({ value, onChange }) => {
  const plugins = useMemo(
    () => [gfm(), frontmatter(), highlight(), gemoji(), breaks()],
    [],
  )

  return (
    <div className='mb-8 lg:mb-10'>
      <BytemdEditor
        value={value}
        onChange={onChange}
        plugins={plugins}
        locale={zhHans}
        uploadImages={async (files) => {
          const { data, success } = await uploadFile({ file: files[0] })
          if (success) return [{ url: data }]
          return []
        }}
      />
    </div>
  )
}
