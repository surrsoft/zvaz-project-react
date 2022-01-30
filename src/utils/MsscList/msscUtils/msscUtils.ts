
export async function fnWait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, duration);
  });
}

/**
 * имя колонки таблицы БД
 */
export type MsscColumnName = string
