import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TextGenerationService } from './text-generation.service';
import { environment } from '../../env';

fdescribe('TextGenerationService', () => {
  let service: TextGenerationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TextGenerationService],
    });
    service = TestBed.inject(TextGenerationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return content from the API', () => {
    const mockResponse = {
      output: {
        choices: [
          {
            finish_reason: 'stop',
            message: {
              role: 'assistant',
              content: '这是一个高情商的回复',
            },
          },
        ],
      },
      usage: {
        total_tokens: 10,
        output_tokens: 5,
        input_tokens: 5,
      },
      request_id: '12345',
    };

    service.generateContent('测试输入').subscribe((content) => {
      expect(content).toEqual('这是一个高情商的回复');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
