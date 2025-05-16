import './input.element.js';

import { assert, fixture, html } from '@open-wc/testing';
import { userEvent } from '@testing-library/user-event';
import { USATextInputElement } from './input.element.js';

describe('usa-input', () => {
  it('should be accessible', async () => {
    const form = await fixture<HTMLFormElement>(html` <usa-input name="fname" value="Foo">Hello World</usa-input> `);

    return assert.isAccessible(form);
  });

  it('should submit form with default values', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-input name="fname" value="Foo">Hello World</usa-input>

        <button>Submit</button>
      </form>
    `);

    const value = new FormData(form);

    assert.equal(value.get('fname'), 'Foo');
  });

  it('should display default attribute value', async () => {
    const input = await fixture<USATextInputElement>(html`
      <usa-input name="fname" value="Foo">Hello World</usa-input>
    `);

    const nativeInput = input.shadowRoot?.querySelector('input');

    assert.equal(nativeInput?.value, 'Foo');
  });

  it('should update form value as input value changed', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-input name="fname">Hello World</usa-input>

        <button>Submit</button>
      </form>
    `);

    const input = form.querySelector('usa-input');
    const nativeInput = input?.shadowRoot?.querySelector('input');

    if (nativeInput) {
      await userEvent.type(nativeInput, 'Bar');
    }

    const value = new FormData(form);

    assert.equal(value.get('fname'), 'Bar');
  });

  it('should not submit when not valid', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-input name="fname" required>Hello World</usa-input>

        <button>Submit</button>
      </form>
    `);

    assert.equal(form.checkValidity(), false);
  });
});
