export function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((res, key) => {
      const camel = key.replace(/(_\w)/g, (matchs) => matchs[1].toUpperCase());
      return {
        ...res,
        [camel]: toCamelCase(obj[key]),
      };
    }, {});
  }
  return obj;
}
