import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express();



const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"bibilotheque"
   
    

})


app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Salamo alikoum: this the backend")
})

app.get("/books", (req,res)=>{
    const q= "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})


app.post("/books", function(req, res) {
  //const { nom, age } = req.body; // Récupérer les données du formulaire

  const q = "INSERT INTO books (`title`,`descrip`,`price`,`cover`) values(?)";

  //const values=["title from backend","descrip from backend","cover from backend"]
  const values=[req.body.title,req.body.descrip,req.body.price,req.body.cover]
  
db.query(q, [values], (err,data) =>{
  if (err)
   return res.json(err)
   return res.json("Books has been created")
});
});

app.delete("./books/:id", (req,res)=>{
const bookId=req.params.id;
const q=" Delete from books where id=?";



db.query(q, [bookId], (err,data) =>{
  if (err)
   return res.json(err)
   return res.json("Books has been delete");
})
})

app.listen(8800, ()=>{
  console.log("Connected to Backend!1")
})