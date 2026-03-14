/**
 * Wordscheck API Client
 * HTTP client for the Chinese sensitive word detection service.
 */

export interface SensitiveWord {
  keyword: string;
  category: string;
  level: string;
  suggestion?: string[];
  startIndex: number;
  endIndex: number;
}

export interface CheckResult {
  wordCount: number;
  wordList: SensitiveWord[];
  stats: {
    high: number;
    mid: number;
    low: number;
    tip: number;
  };
  hasSensitive: boolean;
  hasHighRisk: boolean;
}

export interface APIResponse<T> {
  code: string;
  msg: string;
  data: T;
}

export interface SuggestionMap {
  [category: string]: {
    [word: string]: string[];
  };
}

export class WordscheckClient {
  private baseUrl: string;
  private accessToken: string | undefined;
  private timeout: number;

  constructor(baseUrl?: string, accessToken?: string, timeout?: number) {
    this.baseUrl = (baseUrl || process.env.WORDSCHECK_API_BASE || "https://www.xdhdancer.top/api8888").replace(/\/+$/, "");
    this.accessToken = accessToken || process.env.WORDSCHECK_ACCESS_TOKEN || undefined;
    this.timeout = timeout || 10000;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`;
    }
    return headers;
  }

  /**
   * Check text for sensitive/prohibited words.
   */
  async check(text: string, ner: boolean = true): Promise<APIResponse<CheckResult>> {
    const res = await fetch(`${this.baseUrl}/check`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ text, ner }),
      signal: AbortSignal.timeout(this.timeout),
    });

    if (res.status === 429) {
      throw new Error("Rate limit exceeded. Free tier allows 100 requests/day. Set WORDSCHECK_ACCESS_TOKEN for unlimited access.");
    }

    if (res.status === 401 || res.status === 403) {
      throw new Error("Invalid or expired access token. Please check your WORDSCHECK_ACCESS_TOKEN.");
    }

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<APIResponse<CheckResult>>;
  }

  /**
   * Get replacement suggestions for sensitive words.
   */
  async getSuggestions(): Promise<APIResponse<SuggestionMap>> {
    const res = await fetch(`${this.baseUrl}/api/suggestions`, {
      method: "GET",
      headers: this.getHeaders(),
      signal: AbortSignal.timeout(this.timeout),
    });

    if (res.status === 429) {
      throw new Error("Rate limit exceeded. Free tier allows 100 requests/day. Set WORDSCHECK_ACCESS_TOKEN for unlimited access.");
    }

    if (res.status === 401 || res.status === 403) {
      throw new Error("Invalid or expired access token. Please check your WORDSCHECK_ACCESS_TOKEN.");
    }

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json() as Promise<APIResponse<SuggestionMap>>;
  }
}
