import { config } from "./config/env.js"
import { app } from "./app.js";
import { connectDB } from "./db/connectDB.js";



connectDB()
    .then(() => {
        app.listen(config.PORT || 3007, () => {
            console.log(`Server started at http://localhost:${config.PORT}`);
        })
    })
    .catch((err) => {
        console.log('Error loading server after db connection');
        process.exit(1);
    })
