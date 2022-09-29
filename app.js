const express = require('express');
const path = require('path');

const app = express();
const port = 4000;
const DIST_FOLDER = path.join(process.cwd(), '/');

app.get('*.*', express.static(DIST_FOLDER));
app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_FOLDER, '/index.html'), { req });
});

app.listen(port, () => {
    console.log(`Tourwow Finance Backoffice: listening on port ${port}`);
});
