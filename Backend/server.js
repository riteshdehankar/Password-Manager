const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const cors = require("cors")
const bcrypt = require("bcrypt")

const app = express()
app.use(express.json())
app.use(cors())

const port = 8080

const url = "mongodb://localhost:27017/"
const client = new MongoClient(url)

async function start() {

 await client.connect()
 console.log("MongoDB Connected")

 const db = client.db("passop")
 const collection = db.collection("passwords")


 // ROOT
 app.get("/", (req,res)=>{
   res.send("PassOP Backend Running 🚀")
 })

 // UPDATE PASSWORD
app.put("/update/:id", async (req,res)=>{

 const {site,username,password} = req.body

 const hashedPassword = await bcrypt.hash(password,10)

 const result = await collection.updateOne(
  {_id:new ObjectId(req.params.id)},
  {$set:{site,username,password:hashedPassword}}
 )

 res.json(result)

})

 // SAVE PASSWORD
 app.post("/save", async (req,res)=>{

  console.log("BODY RECEIVED:", req.body)

  const {site,username,password} = req.body

  const hashedPassword = await bcrypt.hash(password,10)

  const result = await collection.insertOne({
    site,
    username,
    password:hashedPassword
  })

  console.log("DATA INSERTED:", result)

  res.json(result)
})


 // GET PASSWORDS
 app.get("/all", async(req,res)=>{
   const data = await collection.find({}).toArray()
   res.json(data)
 })


 // DELETE PASSWORD
 app.delete("/delete/:id", async(req,res)=>{
   const result = await collection.deleteOne({
     _id:new ObjectId(req.params.id)
   })

   res.json(result)
 })


 app.listen(port,()=>{
   console.log(`Server running on http://localhost:${port}`)
 })

}

start()
