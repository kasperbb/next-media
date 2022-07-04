import type { NextApiRequest, NextApiResponse } from 'next'

import Pusher from 'pusher'

interface Data {
  name: string
}

const pusher = new Pusher({
  appId: '1432684',
  key: 'b3f051206dfd0c61e908',
  secret: 'b74de2f7259883cccb02',
  cluster: 'eu',
})

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(req.body)

  pusher.trigger('sonarr-grab', 'download', { message: req.body })

  res.status(200).json({ name: 'John Doe' })
}
