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