# Design Document for Fjale

## Principles

- pure frontend application based on angular
- replicate wordle game
- basic html + css

## Functionality

- user has 5 tries to guess a word with 5 letters
- each try (word) reveals for each letter if:
  - it is inside the correct word at the right posiion (green)
  - if it is inside the correct word at a wrong position (yellow)
- random word will be choosen from a list of word sourced from dict.cc
