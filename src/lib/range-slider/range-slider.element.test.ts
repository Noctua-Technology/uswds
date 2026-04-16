import './range-slider.element.js';

import { assert, fixtureSync, html } from '@open-wc/testing';
import { userEvent } from '@testing-library/user-event';

import type { USARangeSliderElement } from './range-slider.element.js';

describe('usa-range-slider', () => {
  it('should be accessible', async () => {
    const rangeSlider = fixtureSync<USARangeSliderElement>(html`
      <usa-range-slider name="slider" value="0">Hello World</usa-range-slider>
    `);

    return assert.isAccessible(rangeSlider);
  });

  it('should submit form with default values', async () => {
    const form = fixtureSync<HTMLFormElement>(html`
      <form>
        <usa-range-slider name="slider" value="50">Hello World</usa-range-slider>

        <button>Submit</button>
      </form>
    `);

    const value = new FormData(form);

    assert.equal(value.get('slider'), '50');
  });

  it('should update form value as input value changed', async () => {
    const form = fixtureSync<HTMLFormElement>(html`
      <form>
        <usa-range-slider name="slider" value="50">Hello World</usa-range-slider>

        <button>Submit</button>
      </form>
    `);

    const input = form.querySelector('usa-range-slider');

    assert.ok(input?.shadowRoot);

    const nativeInput = input.shadowRoot.querySelector('input');

    assert.ok(nativeInput);

    nativeInput.value = '75';
    nativeInput.dispatchEvent(new Event('change', { bubbles: true }));

    await Promise.resolve();

    const value = new FormData(form);

    assert.equal(value.get('slider'), '75');
  });
});
