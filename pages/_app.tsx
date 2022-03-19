import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { Component, FC } from 'react'
type Props = {
  Component: FC<any>
  pageProps: any
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: FC<any>
  pageProps: any
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
