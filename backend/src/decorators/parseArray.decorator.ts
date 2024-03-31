import { Transform } from 'class-transformer';

export function ParseArray(): PropertyDecorator {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (error) {
        throw new Error('Invalid JSON string');
      }
    }
    return value;
  });
}
