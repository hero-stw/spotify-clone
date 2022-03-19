import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { Component, FC } from 'react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
