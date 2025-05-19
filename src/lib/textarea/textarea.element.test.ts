import './textarea.element.js';

import { assert, fixture, html } from '@open-wc/testing';
import { userEvent } from '@testing-library/user-event';

describe('usa-textarea', () => {
  it('should be accessible', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <usa-textarea name="fname" value="Foo">Hello World</usa-textarea>
    `);

    return assert.isAccessible(form);
  });

  it('should submit form with default values', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-textarea name="fname" value="Foo">Hello World</usa-textarea>

        <button>Submit</button>
      </form>
    `);

    const value = new FormData(form);

    assert.equal(value.get('fname'), 'Foo');
  });

  it('should update form value as input value changed', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-textarea name="fname">Hello World</usa-textarea>

        <button>Submit</button>
      </form>
    `);

    const input = form.querySelector('usa-textarea');
    const nativeInput = input?.shadowRoot?.querySelector('textarea');

    if (nativeInput) {
      await userEvent.type(nativeInput, 'Bar');
    }

    const value = new FormData(form);

    assert.equal(value.get('fname'), 'Bar');
  });

  it('should not submit when not valid', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-textarea name="fname" required>Hello World</usa-textarea>

        <button>Submit</button>
      </form>
    `);

    assert.equal(form.checkValidity(), false);
  });
});
