export type Playlist = {
  _id: string
  name: string
  images: [url: string]
  description: string
  owner: {
    displayName: string
  }
  followers: {
    total: number
  }
  tracks: {
    total: number
    items: Object[]
  }
}
