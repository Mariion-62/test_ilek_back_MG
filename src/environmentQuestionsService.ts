import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';


@Injectable()
export class EnvironmentQuestionsService {

  questions = environmentQuestions;

  #getFiveQuestions(): any {
    const shuffledQuestions = this.questions.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, 5).map((question) => {
      const randomQuestion = JSON.parse(JSON.stringify(question));
      randomQuestion.answers.forEach((answer) => {
        delete answer.isCorrect;
      });
      return randomQuestion;
    });
    return selectedQuestions;
  }
  calculateScore(answers: { [key: number]: number }): number {
    let score = 0;
    for (const questionId in answers) {
      const question = this.questions.find((ask) => ask.id === +questionId);
      const answerId = answers[questionId];
      const selectedAnswer = question?.answers.find((answer) => answer.id === answerId);

      if (selectedAnswer?.isCorrect) {
        score++;
      }
    }
    return score;
  }


  getQuestions(): any {

    return this.#getFiveQuestions();
  }
}
