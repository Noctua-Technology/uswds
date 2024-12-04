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
      {
        type: "modify",
        path: "src/define.ts",
        transform(template, { name }) {
          const kebabCase = plop.getHelper("kebabCase")(name);
          const imprt = `import "./lib/${kebabCase}/${kebabCase}.element.js"`;

          if (template.includes(imprt)) {
            return template;
          }

          return `${template.trim()}\n${imprt}`;
        },
      },
      {
        type: "modify",
        path: "src/lib.ts",
        transform(template, { name }) {
          const kebabCase = plop.getHelper("kebabCase")(name);
          const pascalCase = plop.getHelper("pascalCase")(name);

          const exprt = `export { USA${pascalCase}Element } from "./lib/${kebabCase}/${kebabCase}.element.js";`;

          if (template.includes(exprt)) {
            return template;
          }

          return `${template.trim()}\n${exprt}`;
        },
      },
    ],
  });
}
