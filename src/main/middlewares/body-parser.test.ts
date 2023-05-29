import app from '../config/app'
import request from 'supertest'

describe('Body Parser Middleware', () => {
  test('should ', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app).post('/test_body_parser')
      .send({ name: 'Thiago' })
      .expect({ name: 'Thiago' })
  })
})
