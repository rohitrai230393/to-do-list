const express=require("express");
const app=express();
const users=[{
    name:"Rohit rai",
    kidneys:[{
        healthy:false
    },{
        healthy:false
    },{
        healthy:true
    }]
}]

app.get("/", function (req,res){
    let firstUser=users[0];
    let numberOfKidneys=firstUser.kidneys.length;
    let numberOfHealthyKidneys=0;
    for (let i=0;i<numberOfKidneys;i++){
        if (firstUser.kidneys[i].healthy){
            numberOfHealthyKidneys+=1;
        }
    }
    let numberOfUnhealthyKidneys=numberOfKidneys-numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys,
    })

})
app.use(express.json());
app.post("/",(req,res)=>{
    let isHealthy=req.body.isHealthy;
    users[0].kidneys.push({healthy:isHealthy
    })
    res.json(
        "data send"
    )


})

app.put("/",(req,res)=>{
    for (let i=0;i<users[0].kidneys.length;i++){
        if ( users[0].kidneys[i].healthy==false){
            users[0].kidneys[i].healthy=true;
        }
    }
    res.json({})
})
app.delete("/",(req,res)=>{
    let newKidneys =[]
    for (let i=0;i<users[0].kidneys.length;i++){
        if( users[0].kidneys[i].healthy){
            newKidneys.push({healthy:true})
        }
    }
    users[0].kidneys=newKidneys
    res.json({})
        })
app.listen(3000)


