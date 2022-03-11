import { useEffect, useState } from 'react'

type Data = {
  word: string
}

export function useWordSelection() {
  const [word, setWord] = useState('')

  const fetchWord = async () => {
    const response = await fetch('./api/word')
    if (response.ok) {
      const data = await response.json() as Data
      setWord(data.word)
    }
  }

  useEffect(() => {
    fetchWord()
  }, [])

  const resetWord = () => fetchWord()

  return [word, resetWord] as const
}
