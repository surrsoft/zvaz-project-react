
export const MSSC_LIST_SORT_RANDOM = 'mssc-random'

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
