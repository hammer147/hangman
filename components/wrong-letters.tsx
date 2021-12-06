import { Letter } from '../typings'
import styles from './wrong-letters.module.css'

type Props = {
  wrongLetters: Letter[]
}

const WrongLetters = ({ wrongLetters }: Props) => {
  return (
    <div className={styles.wrongLettersContainer}>
      <div>
        {!!wrongLetters.length && <p>Wrong</p>}
        {wrongLetters.map((letter, i) => <span key={i}>{i === 0 ? letter : ',' + letter}</span>)}
      </div>
    </div>
  )
}

export default WrongLetters
