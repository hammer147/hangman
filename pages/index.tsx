import type { NextPage } from 'next'
import { useCallback, useEffect, useRef, useState } from 'react'
import { checkWin } from '../helpers'
import { Letter } from '../typings'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import Figure from '../components/figure'
import WrongLetters from '../components/wrong-letters'
import Word from '../components/word'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal'
import Keyboard from '../components/keyboard/keyboard'


const words = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'] // lowercase letters
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

Modal.setAppElement('#__next')

const Home: NextPage = () => {

  const [selectedWord, setSelectedWord] = useState(() => words[Math.floor(Math.random() * words.length)])
  const [correctLetters, setCorrectLetters] = useState<Letter[]>([])
  const [wrongLetters, setWrongLetters] = useState<Letter[]>([])
  const [modalText, setModalText] = useState('')




  // function fullScreenCheck() {
  //   if (document.fullscreenElement) return
  //   return document.documentElement.requestFullscreen()
  // }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await fullScreenCheck()
  //     } catch (err) {
  //       alert(err)
  //     }
  //     screen.orientation.lock('portrait')
  //       .then(() => alert('Locked to portrait'))
  //       .catch(error => alert(error))
  //   })()
  // }, [])




  const reset = () => {
    setSelectedWord(() => words[Math.floor(Math.random() * words.length)])
    setCorrectLetters([])
    setWrongLetters([])
    setModalText('')
  }

  const handleKeyInput = useCallback((key: string) => {
    toast.dismiss()
    if (letters.includes(key)) {
      const letter = key.toLowerCase() as Letter
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          setCorrectLetters(prev => [...prev, letter])
        } else {
          toast.info('You already entered this letter.')
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          setWrongLetters(prev => [...prev, letter])
        } else {
          toast.info('You already entered this letter.')
        }
      }
    }
  }, [correctLetters, selectedWord, wrongLetters])

  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => handleKeyInput(key)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyInput])

  useEffect(() => {
    const status = checkWin(selectedWord, correctLetters, wrongLetters)
    if (status === 'win') {
      setModalText('Congratulations, you won!')
    } else if (status === 'lose') {
      setModalText(`Unfortunately you lost...`)
    }
  }, [correctLetters, selectedWord, wrongLetters])

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <div className={styles.row}>
          <Figure errors={wrongLetters.length} />
          <WrongLetters wrongLetters={wrongLetters} />
        </div>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Keyboard handleKeyInput={handleKeyInput} />
      <ToastContainer />
      <Modal
        isOpen={!!modalText}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h1>{modalText}</h1>
        <h3>the word was</h3>
        <h1>{selectedWord.toLocaleUpperCase()}</h1>
        <button onClick={reset}>New Game</button>
      </Modal>
    </div>
  )
}

export default Home
