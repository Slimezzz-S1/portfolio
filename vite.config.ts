import { defineConfig } from 'vite'

import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { imagetools } from 'vite-imagetools'
// import {viteSingleFile} from "vite-plugin-singlefile"

// https://vite.dev/config/
export default defineConfig({
  resolve : {
    tsconfigPaths : true,
  },
  build : {

    minify : "terser",
    cssMinify : "lightningcss",
    terserOptions : {
      maxWorkers : 16
    },
  },
  
  plugins: [
    // viteSingleFile(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.pathname.match(/\.png$/i)) {
          return new URLSearchParams({
            format: "webp",
            quality: "80",
          })
        }
        return new URLSearchParams()
      },
      removeMetadata : true,
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
    tailwindcss({
      optimize : {
        minify : true,
      }
    }),
    svgr(),
    ViteImageOptimizer({
      png : {
        effort : 10,
        compressionLevel : 9,
        quality : 80,
      },
      svg: {
        multipass: true,
        plugins: [
          "preset-default",
          "removeDimensions",
          "removeComments",
        ],
      },
      jpeg : {
        quality : 80,
      },
      jpg : {
        quality : 80,
      }
    }),
  ],

  base : '/portfolio/',
  appType : "spa",  
})
