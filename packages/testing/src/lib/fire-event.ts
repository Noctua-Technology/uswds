export const fireEvent = {
  click(el: HTMLElement) {
    return new Promise<void>((resolve) => {
      el.addEventListener("click", () => {
        resolve();
      });

      el.dispatchEvent(new Event("click"));
    });
  },
};
