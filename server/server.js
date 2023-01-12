import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../src/App";

const PORT = 6060;
const app = express();

app.get("^/$", (req, res) => {
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Some error")
        }
        const html = ReactDOMServer.renderToString(
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        )
        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
        );
    })
})

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
