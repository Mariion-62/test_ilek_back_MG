import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import { Response } from 'express';
import { MitigationQuestionsService } from './mitigationQuestionService';

describe('AppController', () => {
  let appController: AppController;
  let environmentQuestionsService: EnvironmentQuestionsService;
  let mitigationQuestionService: MitigationQuestionsService;

  let responseMock: Response<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [EnvironmentQuestionsService, MitigationQuestionsService],
    }).compile();

    appController = module.get<AppController>(AppController);
    environmentQuestionsService = module.get<EnvironmentQuestionsService>(EnvironmentQuestionsService);
    mitigationQuestionService = module.get<MitigationQuestionsService>(MitigationQuestionsService);

    responseMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response<any>;
  });

  describe('getEnvironmentQuestions', () => {
    it('should return some questions with status 200', () => {

      const questions = [
        { id: 1, question: 'Question 1' },
        { id: 2, question: 'Question 2' },
      ];

      jest.spyOn(environmentQuestionsService, 'getQuestions').mockReturnValue(questions);

      appController.getEnvironmentQuestions(responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(responseMock.json).toHaveBeenCalledWith(questions);
    });
  });
  it('should handle error and return 500 status with error message', () => {
    const errorMessage = 'Error with fetching questions';

    jest.spyOn(environmentQuestionsService, 'getQuestions').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    appController.getEnvironmentQuestions(responseMock);

    expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(responseMock.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  describe('postMitigationQuestions', () => {
    it('should calculate score and return it with status 200', () => {
      const answers = { 1: 2, 2: 3, 3: 1 };
      const calculatedScore = 6;

      jest.spyOn(mitigationQuestionService, 'calculateScore').mockReturnValue(calculatedScore);

      appController.postMitigationQuestions(answers, responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(responseMock.json).toHaveBeenCalledWith({ score: calculatedScore });
    });
    it('should return an error with status 500', () => {

      jest.spyOn(environmentQuestionsService, 'getQuestions').mockImplementation(() => {
        throw new Error('Mocked error');
      });

      appController.getEnvironmentQuestions(responseMock);

      expect(responseMock.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(responseMock.json).toHaveBeenCalledWith({
        error: 'Error with fetching questions',
      });
    });
  });
});
