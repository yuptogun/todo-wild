import { Ref } from "vue";

export const onClickedOutside = (e: Event, ref: Ref, onClose: Function) => {
  if (ref.value && !ref.value.contains(e.target)) {
    onClose();
  }
};
export const getRandom = (items: string[]) => items[Math.floor(Math.random() * items.length)];
export const getLastSelectedListID = () => {
  const id = window.localStorage.getItem('selectedListID');
  return id == null ? null : parseInt(id);
};
export const setLastSelectedListID = (listID: string|number) => {
  window.localStorage.setItem('selectedListID', listID.toString());
};
export const unsetLastSelectedListID = () => {
  window.localStorage.removeItem('selectedListID');
};
export const colorsSubmitButton =
  `bg-gray-800 text-white disabled:bg-gray-200 disabled:text-gray-400 dark:bg-gray-200 dark:text-black dark:disabled:bg-gray-700 dark:disabled:text-gray-500 focus-visible:outline-offset-2 focus-visible:outline-gray-800 `;
export const colorsToggleButton =
  `text-slate-700 bg-slate-100 hover:bg-slate-200 focus-visible:outline-offset-2 focus-visible:outline-slate-200 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 `;