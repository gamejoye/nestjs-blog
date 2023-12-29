import * as dayjs from 'dayjs';

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export function getCurrentDatetime() {
  return dayjs().format(DATETIME_FORMAT);
}
