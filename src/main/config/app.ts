import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import express from 'express'
import setupSwagger from './config-swagger'

const app = express()
setupMiddleware(app)
setupRoutes(app)
setupSwagger(app)

export default app
