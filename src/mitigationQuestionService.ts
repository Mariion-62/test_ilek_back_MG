import { Injectable } from '@nestjs/common';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import * as mitigationQuestions from './data/questions_mitigation.json';

@Injectable()
export class MitigationQuestionsService extends EnvironmentQuestionsService {
    questions = mitigationQuestions;
}
