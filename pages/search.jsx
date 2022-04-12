import React from 'react'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Player from '../components/Player'
import SearchPage from '../components/Search'
import { getSession, useSession } from 'next-auth/react'
const Search = () => {
  const { data: session, status } = useSession()
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex gap-0">
        <Sidebar />
        <SearchPage />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export default Search
export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}
