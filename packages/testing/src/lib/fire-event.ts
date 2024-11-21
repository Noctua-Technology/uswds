export const fireEvent = {
  click(el: HTMLElement, init?: EventInit) {
    return dispatch(el, "click", init);
  },
  change(el: HTMLElement, init?: EventInit) {
    return dispatch(el, "change", init);
  },
  input(el: HTMLElement, init?: EventInit) {
    return dispatch(el, "input", init);
  },
};

function dispatch(el: HTMLElement, name: string, init?: EventInit) {
  return new Promise<Event>((resolve) => {
    el.addEventListener(name, (e) => {
      resolve(e);
    });

    el.dispatchEvent(new Event(name, init));
  });
}
