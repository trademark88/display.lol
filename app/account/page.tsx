import { AccountSektionGeneral } from '@/components/component/account-sektion-general'
import { cookies } from 'next/headers'
import React from 'react'

const page = () => {
 
  return (
    <>
    <h5>Account Overview</h5>
    <AccountSektionGeneral/>
    </>
  )
}

export default page