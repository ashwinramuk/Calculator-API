const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
app.get("/",(req,res)=>{
    res.send("Hello world!");
})

let response ={
    failure:{status:"failure",message: "Invalid data types"},
    overflow:{status: "error",message: "Overflow"},
    underflow:{status: "error",message: "Underflow"},
}
function isNum(num1,num2){
    return typeof(num1)=='string'||typeof(num2)=='string'
}

app.post("/add",(req,res)=>{
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    if(isNum(num1,num2)) return res.status(404).json(response.failure)
    let result = num1+num2;
    if(num1<-1e6||num2<-1e6||result<-1e6) return res.json(response.underflow)
    if(num1>1e6||num2>1e6||result>1e6) return res.json(response.overflow)
    res.status(200).json({
        status: "success",
        message: "the sum of given two numbers", 
        sum: result
    })

})

app.post("/subtract",(req,res)=>{
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    if(typeof(num1)=='string'||typeof(num2)=='string') return res.status(404).json(response.failure)
    let result = num1-num2;
    if(num1<-1e6||num2<-1e6||result<-1e6) return res.json(response.underflow)
    if(num1>1e6||num2>1e6||result>1e6) return res.json(response.overflow)
    res.status(200).json({
        status: "success",
        message: "the difference of given two numbers", 
        subtract: result
    })

})

app.post("/multiply",(req,res)=>{
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    if(typeof(num1)=='string'||typeof(num2)=='string') return res.status(404).json(response.failure)
    let result = num1*num2;
    if(num1<-1e6||num2<-1e6||result<-1e6) return res.json(response.underflow)
    if(num1>1e6||num2>1e6||result>1e6) return res.json(response.overflow)
    res.json({
        status: "success",
        message: "The product of given numbers", 
        multiply: result
    })

})

app.post("/divide",(req,res)=>{
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    if(typeof(num1)=='string'||typeof(num2)=='string') return res.status(404).json(response.failure)

    let result = num1/num2;
    if(num2==0) return res.json({
        status: "error",
        message: "Cannot divide by zero"
    })
    if(num1<-1e6||num2<-1e6||result<-1e6) return res.json(response.underflow)
    if(num1>1e6||num2>1e6||result>1e6) return res.json(response.overflow)
    res.json({
        status: "success",
        message: "The division of given numbers", 
        divide: result
    })

})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;