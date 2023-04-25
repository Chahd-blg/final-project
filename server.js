//import app
const app=require("./back-end/app");
//BE server is listining on http://localhost:3001
app.listen(3001,()=>{
    console.log("Express application is listening on PORT 3001..")
});