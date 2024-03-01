const express=require("express");
const fs=require("fs")
const path=require("path");
const app = express();
 function findIndex(array,id){
    for( let i =0;i<array.length;i++){
        if ( array[i].uid==id ){
            return i
        }
    }
}
 app.get("/todo",(req,res)=>{
    fs.readFile("todos.json","utf-8",(err,data)=>{
        let todos=JSON.parse(data)
        if (err) throw err;
        res.status(200).json(todos)
    })
 })

app.get("/todo/:id",(req,res)=>{
    fs.readFile("todos.json",'utf-8',(err,data)=>{
        let id=req.params.id;
        if (err) throw err
       let  todos=JSON.parse(data);
        
        let index=findIndex(todos,id)
        if (index=== undefined){
            res.status(404).send("invalid todo id")
        }
        else {res.json(todos[index])}
    })
})
app.use(express.json())
app.post("/todo",(req,res)=>{
    fs.readFile("todos.json","utf-8",(err,data)=>{
        if (err ) throw err
         let todos=JSON.parse(data);
    
    var newTodo={
        uid:Math.floor(Math.random()*100000),
        todo:req.body.todo
    }
    todos.push(newTodo)
    fs.writeFile("todos.json", JSON.stringify(todos),(err,data)=>{
        if (err) throw err
        console.log("new user updated")
    })
})

})
app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile("todos.json", "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }

        let todos = JSON.parse(data);
        const finalTodo = todos.filter(todo => todo.uid !== id);

        fs.writeFile("todos.json", JSON.stringify(finalTodo), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal Server Error");
            }
            console.log("Todo deleted");
            res.status(200).send("Todo deleted");
        });
    });
});
app.listen(4000)

    


