import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import type { USAInputMaskElement } from './input-mask.element.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'input-mask',
  tags: ['autodocs'],
  render(args) {
    return html`
      <usa-input-mask>
        <usa-input name="phone" placeholder=${args.mask} autocomplete="off" mask=${args.mask} value="1234567890">
          Phone:
        </usa-input>

        <input type="text" placeholder=${args.mask} autocomplete="off" mask=${args.mask} value="1234567890" />
      </usa-input-mask>
    `;
  },
  argTypes: {},
  args: {
    mask: '(999) 999-9999',
  },
} satisfies Meta<USAInputMaskElement>;

export default meta;

type Story = StoryObj<USAInputMaskElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
