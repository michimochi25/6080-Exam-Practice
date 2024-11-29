# Wordle
Description: a clone game of <a href="https://www.nytimes.com/games/wordle/index.html" target="_blank">NYT Wordle</a>
<br/>
<br/>
<img src="https://github.com/michimochi25/6080-Exam-Practice/blob/main/wordle/public/wordle.png" width="300px"/>

Specs:
- Set up a 5x6 grid
- Given a random word from a list of 5-letter words ` ["HIPPO", "TRUNK", "FRANK", "BRING", "MOVIE", "PLUCK", "STING"]`, player guesses the word (they are not aware of this word list)
- Every keypress triggers a letter on the grid
- When `ENTER` key is pressed:
  - Check the input 
  - Green: correct letter + correct position
  - Yellow: letter appears + incorrect position
  - Grey: letter doesn't appear
  - Then, allow user to type in the next row until there are no rows left

Things to Add:
- Flipping animation
- Reset button
