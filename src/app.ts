import { app, PORT } from "./config";

const startApp = async()=>{
    app.listen(PORT, ()=>{
        console.log(`server is listening on port ${PORT}`)
    })
}

startApp()