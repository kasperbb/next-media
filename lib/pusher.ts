import Pusher from 'pusher-js'

export const pusher = new Pusher('b3f051206dfd0c61e908', {
  cluster: 'eu',
})

export const sonarrGrab = pusher.subscribe('sonarr-grab')
