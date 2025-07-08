import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import type { USATextInputElement } from './input.element.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'usa-input',
  tags: ['autodocs'],
  render() {
    return html`
      <form
        @submit=${(e: Event) => {
          e.preventDefault();

          const data = new FormData(e.target as HTMLFormElement);

          console.log(Array.from(data.entries()));
        }}
      >
        <usa-input name="fname" autocomplete="off" detail="pfx">
          <usa-icon icon="credit_card" slot="detail"></usa-icon>

          First name
        </usa-input>

        <usa-button type="submit">Submit</usa-button>
      </form>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USATextInputElement>;

export default meta;

type Story = StoryObj<USATextInputElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};
