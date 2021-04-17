export interface HttpResponse {
  statusCode: number;
  body: any;
}

export interface HttpRequest {
  user?: {
    id: string;
    isAdmin: boolean;
  };
  body?: any;
  query?: any;
  params?: any;
}
