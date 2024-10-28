import { Response } from 'express';

export class CustomError extends Error {
  public code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function handleError(res: Response, error: unknown) {
  if (error instanceof CustomError) {
    return res.status(error.code).json({ error: error.message });
  }

  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}