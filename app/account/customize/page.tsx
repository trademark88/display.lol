import { GeneralCustomization } from '@/components/component/general-customization'
import { Upload } from '@/components/component/upload'
import React from 'react'

const page = () => {
  return (
    <div>
        <Upload/>
        <div className='mt-10'>        <GeneralCustomization/>
        </div>
    </div>
  )
}

export default page