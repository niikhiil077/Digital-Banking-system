import mongoose from 'mongoose'
import { config } from '../config/env.js'

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log('Connected to database successfully...');
    } catch (err) {
        console.log('Failed while connnecting to database...', err.message);
        process.exit(1)
    }
}