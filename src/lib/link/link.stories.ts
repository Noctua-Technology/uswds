import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import type { USALinkElement } from './link.element.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'usa-link',
  tags: ['autodocs'],
  render(args) {
    return html`<usa-link href="${args.href}">Hello World</usa-link>`;
  },
  argTypes: {
    href: {
      type: 'string',
    },
  },
  args: {},
} satisfies Meta<USALinkElement>;

export default meta;

type Story = StoryObj<USALinkElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    href: 'www.google.com',
  },
};
