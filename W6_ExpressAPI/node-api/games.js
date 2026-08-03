const http = require('http');

// ข้อมูลเกม 5 รายการ
const games = [
    { id: 1, name: 'GTA V' },
    { id: 2, name: 'Apex Legends' },
    { id: 3, name: 'Valorant' },
    { id: 4, name: 'ROV' },
    { id: 5, name: 'Free Fire' }
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
    else if (req.url === '/games') {

        res.end(JSON.stringify(games));

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