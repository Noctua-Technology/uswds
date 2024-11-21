export const fireEvent = {
  click(el: HTMLElement) {
    return new Promise<Event>((resolve) => {
      el.addEventListener("click", (e) => {
        resolve(e);
      });

      el.dispatchEvent(new Event("click"));
    });
  },
  change(el: HTMLElement) {
    return new Promise<Event>((resolve) => {
      el.addEventListener("change", (e) => {
        resolve(e);
      });

      el.dispatchEvent(new Event("change"));
    });
  },
};
