# Fluenticons Viewer


New version disclaimer.
This is still under development and I have been trying to work on this a little at a time. It can over time without any announcement, if you'd like to contribute, you're welcome to open a PR and have a go at it.

---
What's new in v2?
1. No more hacks, I've used actual SVG's now, so I was able to add some new features like manipulating them.
2. You can copy snippets for SVGs, Vue component, React Component, HTML Image.
3. You can download SVGs, PNGs, WEBP, Vue component, React Component now.
4. Manipulate colors to see how the icon looks.
5. More performant, loads way too fast now. (Scores 100 on Lighthouse Yay!!). Was surprised to see the site loading in 600ms when I moved from vercel to cloudflare pages.

What's next?
1. Make an advanced editor like adding frames behind the icons. Inspiration - [Bakery](https://apps.apple.com/ne/app/bakery-simple-icon-maker/id1575220747?mt=12) & [Iconscout's Icon Editor](https://iconscout.com/icon-editor) (requires a lot a math, which I am not good at.)
2. Make a npm package for other to use the components in their own projects.


---


4000+ pixel perfect open source icons from [Microsoft](https://github.com/microsoft/fluentui-system-icons).
![Fluent Icons](https://fluenticons.co/social/icon.png)

This site is not affiliated or connected to Microsoft in any way, this is just a viewer for the open-source icons from them.

This was made because I had to open their [Figma](https://www.figma.com/community/file/836835755999342788) file every time I wanted any icons from their list, there was no search or proper tool to view them, hence I made this website as a small weekend project.


## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

### SVG Cleanup

Use SVGO and run `svgo -r ./**/SVG/*.svg -o ../cleaned` to clean and minimise all the raw svg files.

### Delete all sizes except 24 
find `<FILEPATH>` -type f \! -name "*24*" 

Append -delete at the end to delete from the `<FILEPATH>`