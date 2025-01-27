
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../env';
  
interface TextGenerationResponse  {
  output: {
    choices: [
      {
        finish_reason: string;
        message: {
          role: string;
          content: string;
        }
      }
    ];
  };
  usage: {
    total_tokens: number;
    output_tokens: number;
    input_tokens: number;
  };
  request_id: string;
}


@Injectable({
  providedIn: 'root',
})
export class TextGenerationService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  // 定义方法并只返回 content 字段
  generateContent(userInput: string): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    });

    const body = {
      model: 'qwen-max',
      input: {
        messages: [
          {
            role: 'system',
            content:
              '你是一个能够提供情绪价值的高手,你的特点是幽默且充满正能量,总是能够给别人及时的情绪价值,我会给你一些话，你根据这些话给出高情商和简短回复',
          },
          { content: userInput, role: 'user' },
        ],
      },
      parameters: {
        temperature: 0.8,
        seed: 12360,
        result_format: 'message',
      },
    };

    // 使用 map 操作符从响应中提取 content 字段
    return this.http
      .post<TextGenerationResponse>(this.apiUrl, body, { headers })
      .pipe(map((response) => response.output.choices[0].message.content));
  }
}