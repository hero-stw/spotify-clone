import { DesktopComputerIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const Device = () => {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const [devices, setDevices] = useState([])
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session.user.accessToken}`,
  }
  const handleGetAvailableDevice = async () => {
    const response = await axios
      .get('https://api.spotify.com/v1/me/player/devices', {
        headers,
      })
      .then((data) => {
        console.log(data.data.devices)
        setDevices(data.data.devices)
      })
  }
  useEffect(() => {
    handleGetAvailableDevice()
  }, [])
  return (
    <div>
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="inline-flex items-center rounded-lg  px-4 py-2.5 text-center text-sm font-medium text-white "
        type="button"
        onClick={() => setOpen(!open)}
      >
        <DesktopComputerIcon className="button h-6 w-6" />
      </button>
      <div
        id="dropdown"
        className={`w-30 absolute top-[-90px] z-10 divide-y divide-gray-100 rounded bg-black bg-opacity-50 shadow dark:bg-gray-700 ${
          open ? 'block' : 'hidden'
        }`}
      >
        <ul
          className="py-1 text-sm text-white dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {devices.map((device) => (
            <li key={device.id}>
              <button className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                {device.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Device
