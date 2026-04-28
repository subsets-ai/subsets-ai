# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Dev Container

The easiest way to get started is using the included dev container, which comes with all dependencies pre-configured.

**Prerequisites:** [Docker](https://www.docker.com/) and [VS Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

1. Open this repo in VS Code
2. Open the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run `Dev Containers: Reopen in Container`
3. Wait for the container to build and dependencies to install
4. Start the dev server:
   ```
   $ yarn start --host 0.0.0.0
   ```
5. VS Code will automatically forward port 3000 — open the prompted URL in your browser

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using Github Actions
Just push/merge to main branch...


Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
