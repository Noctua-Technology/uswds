import * as format from "js-beautify";

const preview = {
  parameters: {
    docs: {
      source: {
        transform(input) {
          return format.html(input, { indent_size: 2 });
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
};

export default preview;
