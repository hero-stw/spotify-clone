import React from 'react'
import AdminHeader from '../../components/admin/AdminHeader'
import AdminSideBar from '../../components/admin/AdminSideBar'
import SongList from './songs/list'

type Props = {}

function Dashboard({}: Props) {
  return (
    <div className="flex items-start">
      <AdminSideBar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <SongList />
      </div>
    </div>
  )
}
export default Dashboard
