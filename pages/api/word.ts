// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  word: string
}

const wordsDb = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'] // lowercase letters

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const word = wordsDb[Math.floor(Math.random() * wordsDb.length)]
  res.status(200).json({ word })
}
