import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

import type { USAProcessListElement } from './process-list.element.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'usa-process-list',
  tags: ['autodocs'],
  render() {
    return html`
      <usa-process-list>
        <usa-process-list-item>
          <span slot="count">1</span>
          <h4 slot="title">Start a process</h4>

          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci
          magna rhoncus neque.

          <ul>
            <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
            <li>
              Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis.
            </li>
            <li>Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum.</li>
            <li>Aliquam erat volutpat. Sed quis velit.</li>
          </ul>
        </usa-process-list-item>

        <usa-process-list-item>
          <span slot="count">2</span>
          <h4 slot="title">Proceed to the second step</h4>

          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci
          magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae
          ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus
          pharetra posuere sapien.
        </usa-process-list-item>

        <usa-process-list-item>
          <span slot="count">3</span>
          <h4 slot="title">Complete the step-by-step process</h4>

          Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis
          velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien.
        </usa-process-list-item>
      </usa-process-list>
    `;
  },
  argTypes: {},
  args: {},
} satisfies Meta<USAProcessListElement>;

export default meta;

type Story = StoryObj<USAProcessListElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
