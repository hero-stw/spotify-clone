import React from 'react'
import { getProviders, signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { login } from './api/axios/auth'
import { useRouter } from 'next/router'
function Login({ providers }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const onSubmit = async () => {
    const data = {
      email,
      password,
    }
    const response = await login(data)
    if (response.status === 200) {
      router.push('/dashboard')
    } else {
      alert('Invalid email or password')
    }
  }
  return (
    <div className="max-w-500px mx-auto grid h-screen place-content-center text-center ">
      <div className="over-hidden max-h-screen bg-white dark:bg-gray-900 ">
        <div className="flex h-screen justify-center">
          <div className="hidden bg-cover lg:block lg:w-2/3">
            <div className="flex h-full items-center  bg-opacity-40 px-20">
              <img
                className="h-full"
                src="https://source.unsplash.com/random?music"
                alt=""
              />
            </div>
          </div>

          <div className="mx-auto flex w-full  max-w-md items-center px-6 lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className=" text-center text-4xl font-bold text-gray-700 dark:text-white">
                  <img
                    className="mx-auto mb-5 mt-[2rem] w-[200px]"
                    src="https://pbs.twimg.com/media/EwhaIBAXMAQCoY4?format=png&name=4096x4096"
                    alt=""
                  />
                </div>

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
                <hr className="mt-5 border-gray-200 dark:border-gray-700"></hr>
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
                      onChange={(e) => setEmail(e.target.value)}
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
                      {/* <a
                        href="#"
                        className="text-sm text-gray-400 hover:text-blue-500 hover:underline focus:text-blue-500"
                      >
                        Forgot password?
                      </a> */}
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 focus:border-[#18d860] focus:outline-none focus:ring focus:ring-[#18d860] focus:ring-opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:border-[#18d860]"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      className="w-full transform rounded-md bg-[#18d860] px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-[#18d860] focus:bg-[#18d860] focus:outline-none focus:ring focus:ring-[#18d860] focus:ring-opacity-50"
                      onClick={() => onSubmit()}
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                  Don&#x27;t have an account yet?{' '}
                  <Link href="/register">
                    <button className="text-[#18d860] hover:underline focus:underline focus:outline-none">
                      Sign up
                    </button>
                  </Link>
                </p>
              </div>
            </div>
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
