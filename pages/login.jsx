import React from 'react'
import { getProviders, signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
function Login({ providers }) {
  const { data: session, status } = useSession()
  console.log(session)
  return (
    <div className="mx-auto grid h-screen w-full items-center overflow-hidden text-center">
      <div className="max-h-full w-full bg-white dark:bg-gray-900">
        <div className="flex h-screen items-center justify-center">
          <div className="mx-auto flex w-full max-w-md items-center px-6">
            <div className="flex-1">
              <img
                className="mx-auto mb-5 mt-[2rem] w-[200px]"
                src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
                alt=""
              />
              {Object.values(providers).map((provider) => (
                <div className="mt-[2rem]" key={provider.name}>
                  <button
                    className="text-bold w-full rounded-[20px] bg-[#18d860] py-2 px-6 text-white"
                    onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                  >
                    Login with {provider.name}
                  </button>
                </div>
              ))}
              <div className="mt-4 flex items-center justify-between space-x-4">
                <div className="block h-[0.5px] w-full bg-gray-500"></div>
                <div>OR</div>
                <div className="block h-[0.5px] w-full bg-gray-500"></div>
              </div>

              <div className="mt-8">
                <form>
                  <div>
                    <label
                      for="email"
                      className="mb-2 block text-left text-sm text-gray-600 dark:text-gray-200"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex justify-between">
                      <label
                        for="password"
                        className="text-sm text-gray-600 dark:text-gray-200"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 hover:text-blue-500 hover:underline focus:text-blue-500"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-blue-400"
                    />
                  </div>

                  <div className="mt-6">
                    <button className="w-full transform rounded-md bg-[#18d860] px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-400 focus:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 inline-flex space-x-3 text-center text-sm text-gray-400">
                  <span> Don&#x27;t have an account yet?</span>
                  <Link href={'/signup'}>
                    <div className="cursor-pointer text-blue-500 hover:underline focus:underline focus:outline-none">
                      Sign up
                    </div>
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="hidden bg-cover lg:flex lg:items-center ">
            <img
              className=""
              src="https://source.unsplash.com/random?music"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
