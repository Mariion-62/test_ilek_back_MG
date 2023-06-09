import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('environment_questions (GET)', () => {
    return request(app.getHttpServer())
      .get('/environment_questions')
      .expect((res) => {
        const questions = res.body;
        expect(Array.isArray(questions)).toBe(true);
        expect(questions.length).toBeGreaterThan(0);
      });
  });
  it('mitigation_questions (GET)', () => {
    return request(app.getHttpServer())
      .get('/mitigation_questions')
      .expect(200).expect((res) => {
        const questions = res.body;
        expect(Array.isArray(questions)).toBe(true);
        expect(questions.length).toBeGreaterThan(0);
      });
  });
  it('calculate_score_environment (POST)', () => {
    return request(app.getHttpServer())
      .post('/calculate_score_environment')
      .expect(200).expect((res) => {
        const score = res.body.score;
        expect(score).toBeDefined();
        expect(typeof score).toBe('number')
      })
  })
  it('calculate_score_mitigation (POST)', () => {
    return request(app.getHttpServer())
      .post('/calculate_score_mitigation')
      .expect(200).expect((res) => {
        const score = res.body.score;
        expect(score).toBeDefined();
        expect(typeof score).toBe('number')
      })
  })
});
