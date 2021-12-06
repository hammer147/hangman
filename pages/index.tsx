import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { checkWin } from '../helpers'
import { Letter } from '../typings'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Figure from '../components/figure'
import WrongLetters from '../components/wrong-letters'
import Word from '../components/word'


const words = ['eventlistener', 'timeout', 'sideeffect', 'cleanup'] // lowercase letters
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const Home: NextPage = () => {

  const [selectedWord, setSelectedWord] = useState(() => words[Math.floor(Math.random() * words.length)])
  const [correctLetters, setCorrectLetters] = useState<Letter[]>([])
  const [wrongLetters, setWrongLetters] = useState<Letter[]>([])

  const reset = () => {
    setSelectedWord(() => words[Math.floor(Math.random() * words.length)])
    setCorrectLetters([])
    setWrongLetters([])
  }

  const handleKeyDown = useCallback(({ key }: KeyboardEvent) => {
    if (letters.includes(key)) { // todo: check if game has ended...
      const letter = key.toLowerCase() as Letter
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          setCorrectLetters(prev => [...prev, letter])
        } else {
          // toast 'You already entered this letter'
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          setWrongLetters(prev => [...prev, letter])
        } else {
          // toast 'You already entered this letter'
        }
      }
    }
  }, [correctLetters, selectedWord, wrongLetters])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    const status = checkWin(selectedWord, correctLetters, wrongLetters)
    if (status === 'win') {
      // modal 'Congratulations, you won!' + button for new game
    } else if (status === 'lose') {
      // modal 'Unfortunately you lost...the word was...
    }
  }, [correctLetters, selectedWord, wrongLetters])

  return (
    <div>
      <Header />
      <div className={styles.gameContainer}>
        <Figure errors={wrongLetters.length} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
    </div>
  )
}

export default Home
