import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import express from 'express'
import setupSwagger from './config-swagger'

const app = express()
setupSwagger(app)
setupMiddleware(app)
setupRoutes(app)

export default app
