class NCTNavBtnElement extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  nav: HTMLDialogElement | null = null;

  get navTarget() {
    return this.getAttribute("nav-target");
  }

  constructor() {
    super();

    this.shadow.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
          width: 35px;
        }

        button {
          cursor: pointer;
          padding: 5px;
          gap: .5rem;
          display: flex;
          flex-direction: column;
          background: none;
          border: none;
          height: 100%;
          width: 100%;
          border-radius: 4px;
        }

        button:focus {
          outline: 0.25rem solid #2491ff;
          outline-offset: 1;
        }

        .line {
          display: block;
          background-color: #4c165f;
          border-radius: 2px;
          height: 2px;
          left: 0;
          width: 100%;
        }
      </style>

      <button aria-label="View navigation">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>
    `;

    this.addEventListener("click", () => {
      if (this.nav === null && this.navTarget) {
        this.nav = document.getElementById(this.navTarget) as HTMLDialogElement;

        if (this.nav) {
          this.nav.addEventListener("click", () => {
            this.nav?.close();
          });
        }
      }

      if (this.nav) {
        if (this.nav.open) {
          this.nav.close();
        } else {
          this.nav.showModal();
        }
      }
    });
  }
}

customElements.define("nct-nav-btn", NCTNavBtnElement);
