import express from 'express';
import bodyParser from "body-parser";
const router = require('./router');
const app = express();
app.listen(3333, () => {
    console.log("server on port 3333",);
});

app.use(bodyParser.json());
app.use(router);
