# UML Sequence Diagrams

## Description
A music player application has an abstract `MusicPlayer` class with several concrete subclasses including a `FavoritesPlayer` class. The MusicPlayer class has a method, playSongs`(List<String> songNames`), that loops over a list of song names, calling a MusicDatabase class' `getSong(String songName)` method which loads a single song from a database, then returns a `Song` which is used by the `MusicPlayer` class to play the song to the user. Each song is played (by calling the `playSong(Song)` method) within this same loop, before any other songs are loaded from the database. The `FavoritesPlayer` class inherits from `MusicPlayer`, and has an additional method, `playFavorites()`, which calls its superclass' `playSongs` method, passing it a previously stored list of song names.

## Result

View the completed sequence diagram at here: [Music App Sequence Diagram](Music%20Application%20Sequence%20Diagram.pdf)
