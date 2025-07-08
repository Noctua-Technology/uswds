import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import { BUTTON_VARIANTS, type USAButtonElement } from './button.element.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'usa-button',
  tags: ['autodocs'],
  render() {
    return html`
      <div style="display: inline-flex; flex-direction: column; gap: 1rem">
        ${BUTTON_VARIANTS.map(
          (variant, i) =>
            html`<usa-button variant=${variant}>Hello World</usa-button> ${i === BUTTON_VARIANTS.length - 1
                ? ''
                : '\n\n'}`,
        )}
        ${BUTTON_VARIANTS.map(
          (variant, i) =>
            html`<usa-button href="#" variant=${variant}>Hello World (Link)</usa-button> ${i ===
              BUTTON_VARIANTS.length - 1
                ? ''
                : '\n\n'}`,
        )}
        <usa-button disabled>Disabled</usa-button>
      </div>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAButtonElement>;

export default meta;

type Story = StoryObj<USAButtonElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
