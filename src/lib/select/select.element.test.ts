import './select.element.js';
import './select-option/select-option.element.js';

import { assert, fixture, html } from '@open-wc/testing';
import { userEvent } from '@testing-library/user-event';

describe('usa-select', () => {
  it('should be accessible', async () => {
    const el = await fixture<HTMLFormElement>(html`
      <usa-select name="example">
        Hello World

        <usa-select-option value="first">First</usa-select-option>
        <usa-select-option value="second">Second</usa-select-option>
        <usa-select-option value="third">Third</usa-select-option>
      </usa-select>
    `);

    return assert.isAccessible(el);
  });

  it('should create local select options', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-select name="example">
          Hello World

          <usa-select-option value="first">First</usa-select-option>
          <usa-select-option value="second">Second</usa-select-option>
          <usa-select-option value="third">Third</usa-select-option>
        </usa-select>
      </form>
    `);

    const nativeInputs = form.querySelector('usa-select')?.shadowRoot?.querySelectorAll('option');

    assert.deepEqual(
      Array.from(nativeInputs ?? []).map((input) => input.value),
      ['first', 'second', 'third'],
    );
  });

  it('should remove select options when options are removed', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-select name="example">
          Hello World

          <usa-select-option value="first">First</usa-select-option>
          <usa-select-option value="second">Second</usa-select-option>
          <usa-select-option value="third">Third</usa-select-option>
        </usa-select>
      </form>
    `);

    const options = form.querySelectorAll('usa-select-option');

    options[1].remove();

    const nativeInputs = form.querySelector('usa-select')?.shadowRoot?.querySelectorAll('option');

    assert.deepEqual(
      Array.from(nativeInputs ?? []).map((input) => input.value),
      ['first', 'third'],
    );
  });

  it('should submit form with default values', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-select name="example" value="second">
          Hello World

          <usa-select-option value="first">First</usa-select-option>
          <usa-select-option value="second">Second</usa-select-option>
          <usa-select-option value="third">Third</usa-select-option>
        </usa-select>
      </form>
    `);

    const value = new FormData(form);

    assert.equal(value.get('example'), 'second');
  });

  it('should update form value as select value changed', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-select name="example" value="second">
          Hello World

          <usa-select-option value="first">First</usa-select-option>
          <usa-select-option value="second">Second</usa-select-option>
          <usa-select-option value="third">Third</usa-select-option>
        </usa-select>
      </form>
    `);

    const select = form.querySelector('usa-select');
    const nativeSelect = select?.shadowRoot?.querySelector('select');

    if (nativeSelect) {
      await userEvent.selectOptions(nativeSelect, 'third');
    }

    const value = new FormData(form);

    assert.equal(value.get('example'), 'third');
  });

  it('should not submit when not valid', async () => {
    const form = await fixture<HTMLFormElement>(html`
      <form>
        <usa-select id="TEST" name="example" required>
          Hello World

          <usa-select-option value="">-Select One -</usa-select-option>
          <usa-select-option value="first">First</usa-select-option>
          <usa-select-option value="second">Second</usa-select-option>
          <usa-select-option value="third">Third</usa-select-option>
        </usa-select>
      </form>
    `);

    assert.equal(form.checkValidity(), false);
  });
});
