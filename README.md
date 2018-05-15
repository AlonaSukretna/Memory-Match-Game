# Memory Game Project

## Table of Contents

* [How The Game Works](#HowTheGameWorks)
* [Description](#description)
* [Contributing](#contributing)

## How The Game Works

The game board consists of sixteen "cards" arranged in a grid.
The deck is made up of eight different pairs of cards, each with different
symbols on one side. The cards are arranged randomly on the grid with the symbol
face down. The gameplay rules are very simple: flip over two hidden cards at a
time to locate the ones that match!

Each turn:

The player flips one card over to reveal its underlying symbol.
The player then turns over a second card, trying to find the corresponding card
with the same symbol.
If the cards match, both cards stay flipped over.
If the cards do not match, both cards are flipped face down.
The game ends once all cards have been correctly matched.


## Description

The game randomly shuffles the cards.
A user wins once all cards have successfully been matched.

When a user wins the game, a modal appears to congratulate the player and ask if
they want to play again. It should also tell the user how much time it took to
win the game, and what the star rating was.

A restart button allows the player to reset the game board, the timer, and the
star rating.

The game displays a star rating (from 1 to at least 3) that reflects the
player's performance. At the beginning of a game, it should display at least
3 stars. After some number of moves, it should change to a lower star rating.
After a few more moves, it should change to a even lower star rating (down to 1).

When the player starts a game, a displayed timer should also start.
Once the player wins the game, the timer stops.

Game displays the current number of moves a user has made.

The starter project https://github.com/udacity/fend-project-memory-game
has some HTML and CSS styling to display a static version of the Memory Game project.

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
