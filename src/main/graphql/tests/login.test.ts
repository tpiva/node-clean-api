import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { createTestClient } from 'apollo-server-integration-testing'
import { ApolloServer, gql } from 'apollo-server-express'
import { makeApolloServer } from './helpers'

let accountCollection: Collection
let apolloServer: ApolloServer

describe('Login GraphQL', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    apolloServer = makeApolloServer()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Login Query', () => {
    const loginQuery = gql`
        query loginQuery ($email: String!, $password: String!) {
            login (email: $email, password: $password) {
                accessToken
                name
            }
        }
    `

    test('Should return an Account on valid credentials', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Thiago',
        email: 'thiago@gmail.com',
        password
      })

      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'thiago@gmail.com',
          password: '123'
        }
      })

      expect(res.data.login.accessToken).toBeTruthy()
      expect(res.data.login.name).toBe('Thiago')
    })

    test('Should return a Unauthorized on invalid credentials', async () => {
      const { query } = createTestClient({ apolloServer })
      const res: any = await query(loginQuery, {
        variables: {
          email: 'thiago@gmail.com',
          password: '123'
        }
      })

      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Unauthorized')
    })
  })

  describe('Signup Mutation', () => {
    const signupMutation = gql`
        mutation signUp ($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
            signUp (name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
                accessToken
                name
            }
        }
    `

    test('Should return an Account on valid credentials', async () => {
      const { mutate } = createTestClient({ apolloServer })
      const res: any = await mutate(signupMutation, {
        variables: {
          name: 'thiago',
          email: 'thiago@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        }
      })

      expect(res.data.signUp.accessToken).toBeTruthy()
      expect(res.data.signUp.name).toBe('thiago')
    })
  })
})
