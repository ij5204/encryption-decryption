const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/crypto', (req, res) => {
    const { text, key, mode } = req.body;
    let result;

    const algorithm = 'aes-256-ctr';
    const secretKey = crypto.createHash('sha256').update(String(key)).digest('base64').substr(0, 32);

    if (mode === 'encrypt') {
        const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(crypto.randomBytes(16), 'hex'));
        result = Buffer.concat([cipher.update(text), cipher.final()]).toString('hex');
    } else if (mode === 'decrypt') {
        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(crypto.randomBytes(16), 'hex'));
        result = Buffer.concat([decipher.update(Buffer.from(text, 'hex')), decipher.final()]).toString();
    }

    res.json({ result });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
