'use server';

import { RegisterValues } from '../schemes/auth.schema';
import { AuthResponse } from '../types/auth';

export async function registerAction(values: RegisterValues) {
  const response = await fetch(`${process.env.API_URL}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const payload: ApiResponse<AuthResponse> = await response.json();
  return payload;
}
