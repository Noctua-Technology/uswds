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

<script type="module" src="https://esm.sh/@noctuatech/uswds@latest"></script>

<usa-config icon-path="/node_modules/@noctuatech/uswds/assets/usa-icons/">
  <usa-alert type="info">
    <h3 slot="heading">Informative status</h3>

    Lorem ipsum dolor sit amet,&nbsp;
    <usa-link href="#">consectetur adipiscing</usa-link>&nbsp;elit, sed do
    eiusmod.
  </usa-alert>
  
  <form>
    <usa-input name="username">
      First name
    </usa-input>

    <usa-input name="password">
      Last name
    </usa-input>

    <usa-button type="submit">Submit</usa-button>
  </form>
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

## USWDS Components Checklist

### Form Components
- [x] Button
- [x] Button group
- [x] Checkbox
- [x] Combo box
- [ ] Date picker
- [ ] Date range picker
- [x] File input
- [x] Input mask
- [x] Input prefix or suffix
- [ ] Memorable date
- [x] Radio buttons
- [x] Range slider
- [x] Search
- [x] Select
- [x] Text input
- [ ] Time picker

### Navigation Components
- [x] Accordion
- [x] Breadcrumb
- [x] In-page navigation
- [x] Link
- [x] Pagination
- [x] Side navigation
- [x] Step indicator

### Content Components
- [x] Alert
- [ ] Banner
- [x] Card
- [x] Collection
- [ ] Footer
- [ ] Header
- [x] Icon
- [ ] List
- [x] Modal
- [x] Process list
- [ ] Prose
- [x] Site alert
- [x] Summary box
- [ ] Table
- [x] Tag
- [ ] Tooltip
