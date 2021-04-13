import express from 'express'
import path from 'path'
import template from './src/template'
import ssr from './src/server'
import data from './assets/data.json'

import { Helmet } from "react-helmet";
const app = express()

// Serving static files
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
app.disable('x-powered-by');
// start the server
app.listen(process.env.PORT || 3009);

let initialState = {
  isFetching: false,
  apps: data
}
const helmet = Helmet.renderStatic();
// server rendered home page
app.get('/', (req, res) => {
  const { preloadedState, content } = ssr(initialState);
  const scripts = ` <script>
window.__STATE__ = ${JSON.stringify(initialState)}
</script>
<script src="assets/client.js"></script>
`;

  const html = `
<!doctype html>
<html ${helmet.htmlAttributes.toString()}>
    <head>
    <title>This is Default content</title>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <link rel="stylesheet" href="assets/style.css">
    </head>
    <body ${helmet.bodyAttributes.toString()}>
    <div class="content">
                   <div id="app" class="wrap-inner">
                      ${content}
                   </div>
                </div>
    </body>
    ${scripts}
</html>
`;
  // const response = template("Server Rendered Page", preloadedState, content)
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(html);
});

// Pure client side rendered page
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response)
});
