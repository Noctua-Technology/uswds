# USWDS

An implementaiton of the US Web Design System using web components.

https://designsystem.digital.gov/

## Getting Started

```sh
npm i @noctuatech/uswds
```

```html
<style>
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

<script src="/node_modules/@noctuatech/uswds/assets/uswds.min.js"></script>

<usa-config
  spritesheet="/node_modules/@noctuatech/uswds/assets/img/sprite.svg"
>
  <usa-alert type="info">
    <h3 slot="heading">Informative status</h3>

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
