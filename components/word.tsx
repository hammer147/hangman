import { Letter } from '../typings'
import styles from './word.module.css'

type Props = {
  selectedWord: string
  correctLetters: Letter[]
}

const Word = ({ selectedWord, correctLetters }: Props) => {
  return (
    <div className={styles.word}>
      {selectedWord.split('').map((letter, i) => (
        <span className={styles.letter} key={i}>
          {correctLetters.includes(letter as Letter) ? letter : ''}
        </span>
      ))}
    </div>
  )
}

export default Word
