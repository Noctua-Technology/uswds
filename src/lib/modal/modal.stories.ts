import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import type { USAModalElement } from './modal.element.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'usa-modal',
  tags: ['autodocs'],
  render() {
    return html`
      <usa-button modal-target="mymodal">Open Modal</usa-button>

      <usa-modal id="mymodal">
        <usa-modal-close></usa-modal-close>

        <usa-modal-heading> Are you sure you want to continue? </usa-modal-heading>

        <usa-input placeholder="foo@email.com" autofocus> Enter your email to continue </usa-input>

        <usa-button modal-action="confirm">Yes I am sure</usa-button>
        <usa-button modal-action="close" variant="outline">Cancel</usa-button>
      </usa-modal>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAModalElement>;

export default meta;

type Story = StoryObj<USAModalElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
