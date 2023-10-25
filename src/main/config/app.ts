import setupMiddleware from './middlewares'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import express from 'express'
import setupSwagger from './config-swagger'

const app = express()
setupStaticFiles(app)
setupSwagger(app)
setupMiddleware(app)
setupRoutes(app)

export default app
