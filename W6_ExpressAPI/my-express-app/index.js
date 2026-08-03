const express = require('express');
const app = express();
 
// Define a route for the root URL ('/')
app.get('/', (req, res) => {
    res.send('ติดตั้ง Express สำเร็จแล้ว!');
});
 
// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server runs at http://localhost:3000');
});