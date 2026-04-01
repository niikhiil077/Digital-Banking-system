import dotenv from 'dotenv'

dotenv.config()




if (!process.env.PORT) {
    throw new Error('PORT env is required..')
}
if (!process.env.JWT_SECRET) {
    throw new Error('JWT SECRET env is required')
}

if (!process.env.MONGO_URI) {
    throw new Error('MONGO URI env is required')
}

export const config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI
}