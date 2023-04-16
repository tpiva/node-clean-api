export interface SurveyModel {
  id: string
  question: string
  answers: SurveyAnswer[]
  date: Date
}

export interface SurveyAnswerModel {
  image?: string
  answer: string
}
