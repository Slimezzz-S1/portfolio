import { defineConfig } from 'vite'

import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { imagetools } from 'vite-imagetools'
// import { viteSingleFile } from "vite-plugin-singlefile"

// https://vite.dev/config/
export default defineConfig({
  resolve : {
    tsconfigPaths : true,
  },
  build : {
    minify : "terser",
    cssMinify : "lightningcss",
    terserOptions : {
      maxWorkers : 16,
      compress : {
        passes : 3,
        dead_code : true,
        drop_console : false,
        unused : true,
        inline : true,
      },
      format : {
        comments : false,
        beautify : false,
      },
      mangle : true
    },
  },
  
  plugins: [
    imagetools({
      defaultDirectives: (url) => {
        if (url.pathname.match(/\.(png|jpe?g)$/i)) {
          return new URLSearchParams({
            format: "webp"
          })
        }
        return new URLSearchParams()
      },
      removeMetadata : true,
    }),
    ViteImageOptimizer({
      webp : {
        effort : 6,
        quality : 80,
        alphaQuality : 100,
        smartSubsample : true,
        smartDeblock : true,
        nearLossless : true
      },
      svg: {
        multipass: true,
        plugins: [
          "preset-default",
          "removeDimensions",
          "removeXMLNS"
        ],
      },
    }),
    react(),
    babel({
      comments : true,
      compact : true,
      generatorOpts : {
        compact : true,
        minified : true
      },
      presets: [
        reactCompilerPreset()
      ]
    }),
    tailwindcss({optimize : {minify : true}}),
    svgr({
      svgrOptions : {
        svgo : true
      }
    }),
    // viteSingleFilqe(),
  ],

  base : '/portfolio/',
  appType : "spa",
  preview : {
    // open : true,
    port : 4173,
  },
  server : {
    port : 5173,
  }
})
