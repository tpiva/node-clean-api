import setupMiddleware from './middlewares'
import setupApolloServer from './apollo-server'
import setupRoutes from './routes'
import setupStaticFiles from './static-files'
import express from 'express'
import setupSwagger from './swagger'

const app = express()
setupApolloServer(app)
setupStaticFiles(app)
setupSwagger(app)
setupMiddleware(app)
setupRoutes(app)

export default app
