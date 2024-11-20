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
        type: "add",
        path: "src/lib/{{kebabCase name}}/{{kebabCase name}}.element.ts",
        templateFile: "generators/element/element.ts.hbs",
      },
      {
        type: "add",
        path: "src/lib/{{kebabCase name}}/{{kebabCase name}}.stories.ts",
        templateFile: "generators/element/stories.ts.hbs",
      },
      {
        type: "add",
        path: "src/lib/{{kebabCase name}}/{{kebabCase name}}.test.ts",
        templateFile: "generators/element/test.ts.hbs",
      },
    ],
  });
}
