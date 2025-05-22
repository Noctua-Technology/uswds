import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

import type { USAFileInputElement } from './file-input.element.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'usa-file-input',
  tags: ['autodocs'],

  argTypes: {},
  args: {},
} satisfies Meta<USAFileInputElement>;

export default meta;

type Story = StoryObj<USAFileInputElement>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Single: Story = {
  args: {},
  render() {
    function onSubmit(e: Event) {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement);

      console.log(data.getAll('upload'));
    }

    return html`
      <form @submit=${onSubmit}>
        <usa-file-input name="upload" required id="wtf">
          Input accepts a single file

          <div slot="description">Drag file here or <usa-link>choose from folder</usa-link></div>
        </usa-file-input>
      </form>
    `;
  },
};

export const Multiple: Story = {
  args: {},
  render() {
    function onSubmit(e: Event) {
      e.preventDefault();

      const data = new FormData(e.target as HTMLFormElement);

      console.log(data.getAll('upload'));
    }

    return html`
      <form @submit=${onSubmit}>
        <usa-file-input name="upload" required multiple>
          Input accepts multiple files

          <div slot="description">Drag file here or <usa-link>choose from folder</usa-link></div>
        </usa-file-input>

        <usa-button type="submit">SUBMIT</usa-button>
      </form>
    `;
  },
};
