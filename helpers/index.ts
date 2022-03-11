import { Letter } from '../typings'

export const checkWin = (selectedWord: string, correctLetters: Letter[], wrongLetters: Letter[]): string => {
  // the word is initially an empty string until we receive a response from the server (see useWordSelection)
  if (selectedWord === '') return ''

  // check for win
  let status = 'win'

  // selectedWord.split('').forEach(letter => {
  //   if (!correctLetters.includes(letter as Letter)) status = ''
  // })

  if (selectedWord.split('').some(letter => !correctLetters.includes(letter as Letter))) {
    status = ''
  }

  // check for lose
  if (wrongLetters.length === 6) status = 'lose'

  return status
}
