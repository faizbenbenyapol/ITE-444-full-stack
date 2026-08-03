const http = require('http');

// ข้อมูลนักเรียน 5 รายการ
const students = [
    { id: 1, name: 'Somchai' },
    { id: 2, name: 'Suda' },
    { id: 3, name: 'Manee' },
    { id: 4, name: 'Piti' },
    { id: 5, name: 'Veera' }
];

// ข้อมูลสินค้า 5 รายการ
const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Mouse' },
    { id: 3, name: 'Keyboard' },
    { id: 4, name: 'Monitor' },
    { id: 5, name: 'Headphones' }
];

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    if (req.url === '/') {

        res.end(JSON.stringify({
            message: 'Welcome API'
        }));

    }
    else if (req.url === '/students') {

        res.end(JSON.stringify(students));

    }
    else if (req.url === '/products') {

        res.end(JSON.stringify(products));

    }
    else {

        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: 'Not Found'
        }));

    }

});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});