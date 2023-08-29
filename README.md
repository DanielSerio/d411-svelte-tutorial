# Dock411 Front End Tutorials & Tips

## Svelte Development Details

### Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

### Building

To create a production version of your app:

```bash
yarn build -m [ENV_NAME]
```

Where `[ENV_NAME]` is the name of the env file you wish to build with. For example, if you would like to build using the values from
`.env.production`, you would type: yarn build -m production. If your env file is named `.env.prod`, you would run:

```bash
yarn build -m prod
```

### Previewing

To preview the last build in a development server, run:

```bash
yarn preview
```

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

### Dock411 - Major differences v4 -> v5-proto

- critical-load stylesheet
- Page & Layout components
- Improved createStorageStore function

#### Difference details

1. `critical-load` stylesheet

While optimizing for web at Dock411, I learned about something I hadn't heard of before, and began to explore [critical-load stylesheets](https://www.smashingmagazine.com/2015/08/understanding-critical-css/).
People have different ideas of what constitutes "critical", but the concept is very simple. Before loading our app styles, we should load a smaller "critical" stylesheet. This will give the user
the impression that page has begun loading earlier, and in turn makes overall load time feel faster.

If you notice in the lib/styles folder, there is a folder of styles called `critical`. This obviously holds all of our critical stylesheet partials (underscore imports are sass partials: 'ex: \_partial.scss').
If you also check out `package.json`, you will notice a `build:scss` command. This builds the critical styles into our static folder, so we can load them at the top of `app.html`. This is another step, however,
so usually I just import the critical stylesheet into my root `+layout.svelte` file, until the critical styles are developed. After all of the styles are complete, I then remove the import & build the styles.

2. `Page` & `Layout` components

`Layout` component

The main purpose of the layout component is to key class names consistent throughout the app, and also handle any window based events the app needs.

`Page` component

The page component has a few purposes. It, like the layout component, keeps class names consistent throughout the app. It also has a required `pageTitle` prop, which stops us from forgetting to add page titles.
There is also a optional `metaDesc` prop that gives the page a `<meta>` description. You could also export a `pageJSON_LD` prop for creating page specific `JSON+LD` for SEO.

With these components, our app always has the following structure:

        html
          body
          div[data-sveltekit]
            .root-layout
              .layout.layout-[LAYOUT_NAME]
                .page.page-[PAGE_NAME]
                  ...

3. Improved createStorageStore function

see `http://localhost:5173/svelte#stores` and `lib/utility/store/create-storage-store.ts`.
