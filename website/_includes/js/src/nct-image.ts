class NCTImageElement extends HTMLElement {
  get src() {
    return this.getAttribute("src");
  }

  connectedCallback() {
    const img = new Image();

    img.ariaHidden = "true";

    if (this.src) {
      img.src = this.src;
    }

    img.addEventListener("load", () => {
      this.innerHTML = "";

      img.height = img.naturalHeight;
      img.width = img.naturalWidth;

      this.append(img);
    });
  }
}

customElements.define("nct-img", NCTImageElement);
