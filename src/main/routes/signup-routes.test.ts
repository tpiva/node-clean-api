import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('should return an account with success', async () => {
    await request(app).post('/api/signup')
      .expect(200)
  })
})
