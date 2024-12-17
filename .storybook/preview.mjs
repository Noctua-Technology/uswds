import "../src/lib/define";

import * as format from "js-beautify";
import { html } from "lit";

const preview = {
  parameters: {
    docs: {
      source: {
        transform(input) {
          return format.html(
            input
              .replace('<usa-config spritesheet="./img/sprite.svg">', "")
              .replace("</usa-config>", ""),
            {
              indent_size: 2,
              wrap_attributes: "force-expand-multiline",
              wrap_attributes_min_attrs: 4,
            }
          );
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story) => {
      return html`
        <usa-config spritesheet="./img/sprite.svg">${story()}</usa-config>
      `;
    },
  ],
};

export default preview;
