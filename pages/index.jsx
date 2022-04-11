import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Player from '../components/Player'

import { getSession, useSession } from 'next-auth/react'
const Home = () => {
  const { data: session } = useSession()
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main className="flex gap-0">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  )
}

export default Home
export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}
