export type Playlist = {
  _id: string
  name: string
  images: [url: string]
  description: string
  owner: {
    display_name: string
  }
  followers: {
    total: number
  }
  tracks: {
    total: number
    items: Object[]
  }
}
