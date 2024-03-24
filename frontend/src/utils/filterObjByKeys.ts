export const filterObjByKeys = (raw: any, allowed: string[]) =>
  Object.keys(raw)
    .filter((key) => !allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = raw[key];
      return obj;
    }, {} as { [key: string]: any });
