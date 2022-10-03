const express=require("express")
const request=require("request")
const bodyParser=require("body-parser")
const path=require("path")
const https=require("https")

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname ,"public")))   //for access the static file which we want to access.
app.get("/",(req,res)=>{

    res.sendFile(__dirname + "/signup.html")

})

app.post("/",(req,res)=>{
    
    const firstName=req.body.fname
    const lastName=req.body.lname
    const email=req.body.email
    
    const data={
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME: lastName
                }

            }
        ]
    }
    const jsondata=JSON.stringify(data)

    const url="https://us11.api.mailchimp.com/3.0/lists/ecd32a45fb"

    const options ={
        method: "POST",
        auth:"manish:1c9a04e20393be369576f23eccbba17d-us11"
    }
    
    const request =https.request(url,options,(response)=>{

        if(response.statusCode==200){
            res.sendFile(__dirname + "/successs.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data",(data)=>{
            console.log(JSON.parse(data))
        })
    })


    request.write(jsondata)
    request.end()

    
})

app.post("/failure",(req,res)=>{

    res.redirect("/")   //it will send to home route again
})

app.listen(4040,()=>{

    console.log("server is running on port 4040")

})
// api key 
//5ef91da94c02bafd96a95c7d184a0e15-us11

// list id
// ecd32a45fb