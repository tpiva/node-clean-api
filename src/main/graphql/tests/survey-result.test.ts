import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../../config/env'

import { createTestClient } from 'apollo-server-integration-testing'
import { ApolloServer, gql } from 'apollo-server-express'
import { makeApolloServer } from './helpers'

let accountCollection: Collection
let surveyCollection: Collection
let apolloServer: ApolloServer

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Thiago',
    email: 'thiago@gmail.com',
    password: '123',
    role: 'admin'
  })

  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })

  return accessToken
}

describe('Survey Result GraphQL', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    apolloServer = makeApolloServer()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('Survey Result Query', () => {
    const surveyResultQuery = gql`
    query surveyResult ($surveyId: String!) {
      surveyResult (surveyId: $surveyId){
        question
        answers {
          answer
          count
          percent
          isCurrentAccountAnswer
        }
        date
      }
    }`

    test('Should return an SurveyResult', async () => {
      const accessToken = await makeAccessToken()
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const { query } = createTestClient({
        apolloServer,
        extendMockRequest: {
          headers: {
            'x-access-token': accessToken
          }
        }
      })
      const res: any = await query(surveyResultQuery, {
        variables: {
          surveyId: surveyRes.ops[0]._id.toString()
        }
      })
      expect(res.data.surveyResult.question).toBe('Question')
    })

    test('Should return an AccessDeniedError if no token is provided', async () => {
      const surveyRes = await surveyCollection.insertOne({
        question: 'Question',
        answers: [{
          answer: 'Answer 1',
          image: 'http://image-name.com'
        }, {
          answer: 'Answer 2'
        }],
        date: new Date()
      })
      const { query } = createTestClient({
        apolloServer
      })
      const res: any = await query(surveyResultQuery, {
        variables: {
          surveyId: surveyRes.ops[0]._id.toString()
        }
      })
      expect(res.data).toBeFalsy()
      expect(res.errors[0].message).toBe('Access Denied!')
    })
  })
})
