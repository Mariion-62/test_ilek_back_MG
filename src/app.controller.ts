import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import { MitigationQuestionsService } from './mitigationQuestionService';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private environmentQuestionsService: EnvironmentQuestionsService,
    private mitigationQuestionsService: MitigationQuestionsService,
  ) { }

  @Get('environment_questions')
  getEnvironmentQuestions(@Res() res: Response): Response<[]> {
    try {
      const questions = this.environmentQuestionsService.getQuestions();
      return res.status(HttpStatus.OK).json(questions)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error with fetching questions',
      });
    }
  }

  @Get('mitigation_questions')
  getMitigationQuestions(@Res() res: Response): Response<[]> {
    try {
      const questions = this.mitigationQuestionsService.getQuestions();
      return res.status(HttpStatus.OK).json(questions)
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error with fetching questions',
      });
    }
  }

  @Post('calculate_score_environment')
  postEnvironmentQuestions(@Body() answers: { [key: number]: number }, @Res() res: Response): Response<any> {
    try {
      const score = this.environmentQuestionsService.calculateScore(answers);
      return res.status(HttpStatus.OK).json({ score });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error with calculating score',
      });
    }
  }
  @Post('calculate_score_mitigation')
  postMitigationQuestions(@Body() answers: { [key: number]: number }, @Res() res: Response): Response<any> {
    try {
      const score = this.mitigationQuestionsService.calculateScore(answers);
      return res.status(HttpStatus.OK).json({ score });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Error with calculating score',
      });
    }
  }
}
