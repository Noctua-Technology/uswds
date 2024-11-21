/**
 * @param {import('plop').NodePlopAPI} plop
 */
export default function (plop) {
  plop.setGenerator("element", {
    description: "adds a new element",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "name of the element",
        filter(value) {
          const val = String(value);

          return val.replace("usa-", "");
        },
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "src/lib/{{kebabCase name}}",
        base: "generators/element",
        templateFiles: "generators/element",
      },
    ],
  });
}
