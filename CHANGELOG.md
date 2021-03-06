# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 3.0.0
### Additions
- UI overhaul.
- Multiplayer rematching.

## 2.0.0
### Additions
- Complete rewrite of the game with React using [Dave's Fullstack System](https://github.com/imdaveead/fullstack-system).
- Rooms! Play with others by inviting them.

### Deletions
- The server. The server is no longer needed as we have rooms.

## 1.2.3 [10/20/18]
### Additions
- **Multiplayer**: Added a setup server button for help setting up a server.

## 1.2.2 [10/19/18]
### Changes
- Now emits a row as `row(number)` instead of a list of rows to support different clients.

## 1.2.1 [10/18/18]
### Additions
- Added buttons to single player to redirect to other locations.
- **Multiplayer**: Checks data before connecting.

### Changes
- **Multiplayer**: Made server emits better.

## 1.2.0 [10/17/18]
### Additions
- **Multiplayer**: Multiplayer complete.

## 1.1.0 [10/14/2018]
### Changes
- Reset properly resets game instead of reloading the page.

## 1.0.0 [10/12/2018]
### Additions
- Initial game.
