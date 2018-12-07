import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router"
import Routes from "../components/Routes"

import { flushChunkNames } from "react-universal-component/server"
import flushChunks from "webpack-flush-chunks"

export default ({ clientStats }) => (req, res) => {
  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames()
  })

  const site = req.headers.host.split(":")[0].split(".")[0]
  const context = { site }

  res.send(`
    <html>
      <head>
        ${styles}
      </head>
      <body>
        <div id="react-root">${renderToString(
          <StaticRouter location={req.url} context={context}>
            <Routes />
          </StaticRouter>
        )}</div>
        ${js}
        ${cssHash}
        <link href="/css/${site}-theme-css.css" rel="stylesheet">
      </body>
    </html>
  `)
}
