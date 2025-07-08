import { define } from '@joist/element/define.js';
import { JoistBindElement } from '@joist/templating/elements/bind.element.js';
import { JoistForElement } from '@joist/templating/elements/for.element.js';
import { JoistIfElement } from '@joist/templating/elements/if.element.js';
import { JoistScopeElement } from '@joist/templating/elements/scope.element.js';
import { JoistValueElement } from '@joist/templating/elements/value.element.js';

define({ tagName: 'usa-if' }, class USAIfElement extends JoistIfElement {});
define({ tagName: 'usa-bind' }, class USABindElement extends JoistBindElement {});
define({ tagName: 'usa-val' }, class USAValueElement extends JoistValueElement {});
define({ tagName: 'usa-for' }, class USAForElement extends JoistForElement {});
define({ tagName: 'usa-scope' }, class USAScopeElement extends JoistScopeElement {});
