# Minimalistic Games



When im bored i like to have something to tinker with, and i also wanted to be able to have an interactive site without having to set up/run anything.

For this purpose i set up this repo where the idea is that i can add/tweak games using React. Everything is then published to [GitHub Pages](https://sutne.github.io/games). I also wanted some form of backend to keep track of users and their gamestats, and opted to use Firebase Firestore.

## Demo Pictures, but you should [try for yourself](https://sutne.github.io/games)

![demo won](demo/game-won.png)
![demo lost](demo/game-lost.png)
![stats](demo/stats.png)


## Current Bugs/Issues

### Minesweeper

**Entire board (all tiles) re-render on every game update**

Not really a problem on the 'beginner/intermediate' board, but since the tiles are fairly complex, it can get 'laggy' on the 'expert' board.

*Solution: Change so that only tiles that actually change are re-rendered.*
  