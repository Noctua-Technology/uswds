import * as format from "js-beautify";

const preview = {
  parameters: {
    docs: {
      source: {
        transform(input) {
          return format.html(input, {
            indent_size: 2,
            wrap_attributes: "force-expand-multiline",
            wrap_attributes_min_attrs: 4,
          });
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
