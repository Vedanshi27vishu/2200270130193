const express= require("express");
const app= express();
const port= 9001;

app.get("/", (req,res)=>{
  res.send("Welcome to the server2!");
})

app.listen(port,()=>{
  console.log("Server is running on port", port);
})