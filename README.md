# Ben Rhodes - CV Website

<div align="center">
  <img src="static/brd.svg" alt="Ben Rhodes Logo" width="200" />
</div>

**Live Site:** [https://ben-rho-des.github.io/ben-rho-des-cv/](https://ben-rho-des.github.io/ben-rho-des-cv/)

A modern, interactive CV website showcasing my full-stack development skills. Built with SvelteKit for performance and developer experience, featuring a Three.js-powered kaleidoscope on the homepage that demonstrates my ability to work with 3D graphics and WebGL.

## Tech Stack

- **SvelteKit** - Modern web framework with excellent developer experience
- **Three.js** - 3D graphics library for the interactive kaleidoscope
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **TypeScript** - Type safety and better developer experience
- **GitHub Pages** - Static site hosting with automatic deployments

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy the app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
