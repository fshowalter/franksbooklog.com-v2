<p align="center">
  <a href="https://www.franksbooklog.com">
    <img alt="Frank's Book Log" src="https://www.franksbooklog.com/assets/default_og.jpg" width="500" />
  </a>
</p>
<h1 align="center">
  Frank's Book Log (v2)
</h1>

Source for www.franksbooklog.com. Built with [Astro](https://astro.build/).

## Setup

1.  **Install nvm.**

    See [the instructions at the NVM repo](https://github.com/nvm-sh/nvm#installing-and-updating).

1.  **Initialize your Node env.**

    An .nvmrc is included in the project.

    ```shell
    # use the .nvmrc version of Node.
    nvm use
    ```

1.  **Install dependencies.**

    NPM has come a long way and we don't need workspaces (yet)

    ```shell
    npm i
    ```

1.  **Start a Dev server.**

    ```shell
    # start Astro dev.
    npm run dev
    ```

1.  **Open the source code and start editing!**

    The site is now running at `http://localhost:4321`.

## What's inside?

A quick look at the non-standard directories included in the project.

    .
    ├── content
    ├── src/images
    ├── src/styles
    └── src/utils

1.  **`/content`**: The book log content. Reviews and data copied from the backend system, as well as front-end specific assets like backdrops and covers. It also contains the content for the [how I grade](https://www.franksmovielog.com/how-i-grade/) page. We don't leverage Astro's content directory because I prefer keeping content and code separate.

1.  **`/src/api`**: Functions to access the data in the `/content` folder. This replaces Gatsby's GraphQL layer. `/src/api/data` contains [Zod](https://zod.dev/) schemas to validate all the JSON and Markdown.

1.  **`/src/utils`**: Shared utility functions.

## Deployment

Push to Github and Actions builds the project and POST's to Netlify.

## What's new in v2?

Gatsby's [deathbed status](https://github.com/gatsbyjs/gatsby/commits/master/) prompted me to migrate to a new framework. Losing Gatsby's GraphQL layer hurt (I still miss it) but the move means I can finally use ES modules and bump multiple dependencies (looking at you, [unified](https://github.com/unifiedjs/unified)).

I also opted to prune as many dependencies as possible in the name of simplicity. Notably:

- Tailwind instead of Vanilla Extract and Sprinkles. The big draw for Vanilla Extract was the ability to leverage Typescript to type the styles, but Tailwind now has an eslint plugin that covers this use case.

- Vitest instead of Jest. Astro's built on Vite (which handles Typescript transpilation), so Vitest is a minimal add. Adding Jest would bring Babel into the mix.

- Npm instead of Yarn. I still prefer Yarn's DX (having to type 'run' for every NPM script is annoying) but Yarn's recent change to how it resolved peer deps made me wary of its long-term stability. I don't need workspaces (yet) so NPM will do.

### Some metrics

Total distinct packages (i.e. name + version):

| v1   | v2  |
| ---- | --- |
| 1800 | 963 |

Source lines of code:

| Language   | v1     | v2    |
| ---------- | ------ | ----- |
| Typescript | 40,362 | 7,269 |
| Javascript | 186    | 260   |
