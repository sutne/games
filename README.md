<div align="center">

# Minimalistic Games

When im bored i like to have something to tinker with, and i also wanted to be able to have an interactive site without having to set up/run anything.

For this purpose i set up this repo where the idea is that i can add/tweak games using React. Everything is then published to [GitHub Pages](https://sutne.github.io/games). I also wanted some form of backend to keep track of users and their gamestats, and opted to use Firebase Firestore.

[![on-push-main-action-status][on-push-main-action-badge]][on-push-main-action]

</div>

## Demo Pictures, but you should [try for yourself](https://sutne.github.io/games)

![demo won](demo/game-won.png)

![demo lost](demo/game-lost.png)

![stats](demo/stats.png)


## Development

### Configuration

To setup the dev environment:

1. Install [mise][mise], make sure to also:
   - add auto-activation for your shell
   - add autocompletion (if it wasn't done automatically)
2. Run `mise install`
3. Create the file `.env` in the root of the project and add the following environment variables from the firebase console:
    ```sh
    REACT_APP_FIREBASE_API_KEY=
    REACT_APP_FIREBASE_AUTH_DOMAIN=
    REACT_APP_FIREBASE_PROJECT_ID=
    REACT_APP_FIREBASE_STORAGE_BUCKET=
    REACT_APP_FIREBASE_MESSAGE_SENDER_ID=
    REACT_APP_FIREBASE_APP_ID=
    ```

### Running

Once the dev environment is configured, serve the app with:

```sh
mise serve
```

> To show all available commands write `mise run` and hit **tab**.

[on-push-main-action]: https://github.com/sutne/games/actions/workflows/on-push-main.yaml
[on-push-main-action-badge]: https://github.com/sutne/games/actions/workflows/on-push-main.yaml/badge.svg
[mise]: https://mise.jdx.dev/getting-started.html