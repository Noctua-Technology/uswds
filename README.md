# USWDS

An implementaiton of the US Web Design System using web components.

https://designsystem.digital.gov/

## Getting Started

```html
<style>
  body:has(:not(:defined)) {
    display: none;
  }

  * {
    font-family:
      Source Sans Pro Web,
      Helvetica Neue,
      Helvetica,
      Roboto,
      Arial,
      sans-serif;
  }
</style>

<script src="https://cdn.jsdelivr.net/npm/@noctuatech/uswds@latest/uswds.min.js"></script>

<usa-config
  spritesheet="https://cdn.jsdelivr.net/npm/@noctuatech/uswds@latest/assets/img/sprite.svg"
>
  <usa-alert type="info">
    <h3 slot="heading">Informative status</h3>

    Lorem ipsum dolor sit amet,&nbsp;
    <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
    eiusmod.
  </usa-alert>

  <usa-alert type="warning">
    <h3 slot="heading">Warning status</h3>

    Lorem ipsum dolor sit amet,&nbsp;
    <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
    eiusmod.
  </usa-alert>

  <usa-alert type="success">
    <h3 slot="heading">Success status</h3>

    Lorem ipsum dolor sit amet,&nbsp;
    <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
    eiusmod.
  </usa-alert>

  <usa-alert type="error">
    <h3 slot="heading">Error status</h3>

    Lorem ipsum dolor sit amet,&nbsp;
    <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
    eiusmod.
  </usa-alert>

  <usa-alert type="emergency">
    <h3 slot="heading">Emergency status</h3>

    Lorem ipsum dolor sit amet,&nbsp;
    <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
    eiusmod.
  </usa-alert>
</usa-config>
```

## Development

### Install

```sh
npm i
```

### Run Storybook

```sh
npm run storybook
```

### Generate a new element

```sh
npm run gen element
```
