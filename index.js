const AWS = require('aws-sdk');
const s3= new AWS.S3();
const fs= require('fs')
const express= require('express');
const app=express();
const port = 8000;

//const file = fs.createWriteStream('secondfile.txt')
// s3.putObject({
//     Body:"Hello scc assignment 4",
//     Bucket:"scc-assignment4",
//     Key:"new file.txt"
// }).promise();

    app.get('/',(req,res)=>{
        fs.readFile('index.html',(err, data) => {
            if (err) {
              res.writeHead(500);
              res.end('Error loading index.html');
            } else {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.end(data);
            }})
    })
app.post('/uploadfile',(req,res)=>{
    s3.getObject({
        Bucket:process.env.S3_bucket_name,
        Key:"intents.json"
    },function(err,data){
            s3.putObject({
                Body:fs.createReadStream('./MOCK_DATA.json'),
                Bucket:process.env.S3_bucket_name,
                Key:"MOCK_DATA.json"
            }).promise(res.send("MOCK DATA uploaded"));
        })
    })
app.post('/deletefile',(req,res)=>{
    s3.deleteObject({
        Bucket:process.env.S3_bucket_name,
        Key:"MOCK_DATA.json"
    }).promise(res.send("file deleted"))
})
app.listen(port, () => {  console.log('We are live on ' + port);});