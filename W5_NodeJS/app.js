/*const http = require("http");
const server = http.createServer((req, res) => {
 
    if (req.url === "/") {
        res.end("Home Page");
    }else if (req.url === "/about") {
        res.end("About Page");
    }else {
        res.end("404 Not Found");
    }
});
server.listen(3000, () => {
    console.log("Server Running...");
});
*/

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    // อ่านไฟล์ student.json
    fs.readFile("student.json", "utf8", (err, data) => {

        if (err) {
            res.write("Read File Error");
            res.end();
            return;
        }

        // แปลง JSON เป็น Object
        const students = JSON.parse(data);

        res.write("<h1>Student List</h1>");

        // วนแสดงข้อมูล
        students.forEach(student => {

            res.write(`
                <p>
                    ${student.id}
                    ${student.name}
                    ${student.major}
                </p>
            `);

        });

        res.end();

    });

});

server.listen(3000, () => {
    console.log("Server Running...");
});
 