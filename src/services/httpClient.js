import * as gpg from './gpgService.js';

export async function post(url, data, options = {}) {
  const gpgIniciado = await gpg.inicializarGPG();

  if (gpgIniciado) {
    const payload = await gpg.cifrarRequest(data);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || `Error ${response.status}`);
    }
    const result = await response.json();
    return gpg.descifrarResponse(result);
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Error ${response.status}`);
  }
  return response.json();
}

export async function get(url, options = {}) {
  return fetch(url, { method: 'GET', headers: options.headers });
}
