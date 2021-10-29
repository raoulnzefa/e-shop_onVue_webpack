const express = require('express');
const fs = require('fs');
const cartRouter = require('./cartRouter');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));
app.use('/api/cart', cartRouter);

const topProductsJSONPath = path.resolve(__dirname, './db/top_products.json')

app.get('/api/top_products', (req, res) => {
    fs.readFile(topProductsJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

const laptopsJSONPath = path.resolve(__dirname, './db/laptops.json');

app.get('/api/laptops', (req, res) => {
    fs.readFile(laptopsJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

const computersJSONPath = path.resolve(__dirname, './db/computers.json');

app.get('/api/computers', (req, res) => {
    fs.readFile(computersJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

const phonesJSONPath = path.resolve(__dirname, './db/phones.json');

app.get('/api/phones', (req, res) => {
    fs.readFile(phonesJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

const watchesJSONPath = path.resolve(__dirname, './db/watches.json');

app.get('/api/watches', (req, res) => {
    fs.readFile(watchesJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

const accessoiresJSONPath = path.resolve(__dirname, './db/accessoires.json');

app.get('/api/accessoires', (req, res) => {
    fs.readFile(accessoiresJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

const allProductsJSONPath = path.resolve(__dirname, './db/allProducts.json')

app.get('/api/allProducts', (req, res) => {
    fs.readFile(allProductsJSONPath, 'utf-8', (err, data) => {
        if (err) {
            res.send(JSON.stringify({ result: 0, text: err }));
        } else {
            res.send(data);
        }
    });
});

const port = 5500;

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});