import styles from './figure.module.css'

type Props = {
  errors: number
}

const Figure = ({ errors }: Props) => {
  return (
    <svg height="250" width="200" className={styles.figure}>
      {/* <!-- Rod --> */}
      <line x1="60" y1="20" x2="140" y2="20" />
      <line x1="140" y1="20" x2="140" y2="50" />
      <line x1="60" y1="20" x2="60" y2="230" />
      <line x1="20" y1="230" x2="100" y2="230" />

      {/* <!-- Head --> */}
      {errors > 0 && <circle stroke="red" fill="red" cx="140" cy="70" r="20" />}
      {/* <!-- Body --> */}
      {errors > 1 && <line stroke="red" x1="140" y1="90" x2="140" y2="150" />}
      {/* <!-- Arms --> */}
      {errors > 2 && <line stroke="red" x1="140" y1="120" x2="120" y2="100" />}
      {errors > 3 && <line stroke="red" x1="140" y1="120" x2="160" y2="100" />}
      {/* <!-- Legs --> */}
      {errors > 4 && <line stroke="red" x1="140" y1="150" x2="120" y2="180" />}
      {errors > 5 && <line stroke="red" x1="140" y1="150" x2="160" y2="180" />}
    </svg>
  )
}

export default Figure
