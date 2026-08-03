const express = require('express')
const app = express()
 
app.get('/', (req,res)=>{
   res.send('หน้าแรก')
})
 
app.get('/about', (req,res)=>{
   res.send('เกี่ยวกับเรา')
})
 
app.get('/contact', (req,res)=>{
   res.send('ติดต่อเรา')
})

app.get('/about-me', (req, res) => {
    res.send('2313111086 Wannipat Benyapol')
})
 
app.listen(3000)
 