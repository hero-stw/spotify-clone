import React from 'react'
import { useParams } from 'react-router-dom'
import { getSongById } from '../../api/axios/songs'
import { SongType } from './list'

function SongDetail() {
  const { id } = useParams()
  const [song, setSong] = React.useState<SongType>()
  const getSong = async () => {
    const res = await getSongById(id)
    setSong(res.data)
  }
  React.useEffect(() => {
    getSong()
  })
  return <div>SongDetail</div>
}

export default SongDetail
