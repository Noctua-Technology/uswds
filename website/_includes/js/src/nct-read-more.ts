class NCTReadMoreElement extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  button: HTMLButtonElement | null = null;
  content: HTMLElement | null = null;
  more: HTMLElement | null = null;
  open = false;

  constructor() {
    super();

    this.shadow.innerHTML = /*html*/ `
      <style>
        :host {
          display: block;
        }

        .content {
          overflow: hidden;
          height: 3lh;
        }

        button {
          cursor: pointer;
          border: none;
          background: none;
          font-weight: bold;
          font-size: 1rem;
          padding: 0;
          margin-top: .5rem;
        }

        .more {
          text-align: center;
        }
      </style>

      <div class="content">
        <slot></slot>
      </div>

      <div class="more">...</div>

      <button>Read more</button>
    `;

    this.button = this.shadow.querySelector("button");
    this.content = this.shadow.querySelector<HTMLElement>(".content");
    this.more = this.shadow.querySelector(".more");

    this.button?.addEventListener("click", () => {
      if (!this.button || !this.content || !this.more) {
        throw new Error("Promblem with template");
      }

      this.open = !this.open;

      if (this.open) {
        this.content.style.height = "auto";
        this.button.innerHTML = "Read less";
        this.more.innerHTML = "";
      } else {
        this.content.style.height = "";
        this.button.innerHTML = "Read more";
        this.more.innerHTML = "...";
      }
    });
  }
}

customElements.define("nct-read-more", NCTReadMoreElement);
