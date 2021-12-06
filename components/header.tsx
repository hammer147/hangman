import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Hangman</h1>
      <p>Find the hidden word - Enter a letter</p>
    </div>
  )
}

export default Header
