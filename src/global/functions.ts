export const getRandom = (items: string[]) => items[Math.floor(Math.random() * items.length)];

export const colorsSubmitButton =
  `bg-gray-800 text-white disabled:bg-gray-200 disabled:text-gray-400 dark:bg-gray-200 dark:text-black dark:disabled:bg-gray-700 dark:disabled:text-gray-500 focus-visible:outline-offset-2 focus-visible:outline-gray-800 `;
export const colorsToggleButton =
  `text-slate-700 bg-slate-100 hover:bg-slate-200 focus-visible:outline-offset-2 focus-visible:outline-slate-200 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 `;