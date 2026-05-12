import rateLimit from 'express-rate-limit';

function ms(val) {
  return parseInt(val, 10);
}

const WINDOW_MS = ms(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const MAX_REQUESTS = ms(process.env.RATE_LIMIT_MAX_REQUESTS) || 100;

export const uploadLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 20,
  message: { error: 'Demasiadas peticiones de upload. Intenta de nuevo en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

export const getLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS,
  message: { error: 'Demasiadas peticiones. Intenta de nuevo en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

export const apiLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 50,
  message: { error: 'Demasiadas consultas. Intenta de nuevo en 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});
