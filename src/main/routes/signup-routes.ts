import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', (req, res) => {
    res.json({
      name: 'Thiago',
      email: 'thiago@gmail.com',
      password: '123',
      passwordConfirmation: '123'
    })
  })
}
