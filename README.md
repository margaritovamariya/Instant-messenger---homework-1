# &lt;tab-panel&gt; element

## Purpose
To implement a prototype page that displays a list of channels and allows switching between them. The messages in them may be fixed.
USING tab panel
The goal of this component is to display tabs controll. It supports vertical and horizontal tabs.
Implementing just basic html, css and js because the page is just prototype. The final project will include the upgraded version.
## Usage

### Script

Add it with stript tag

```html
<script type="module" src="./main.js">
```

### Markup

```html
<tab-panel type="row"></tab-panel>
```

## Attributes

- `type` sets the orientation of the tab controll. Possible values are 'row' for horizontal tab menu and column for vertical tab menu

## Events
- `tabClick` this event is fired when a user clicks on a tab and the information that it brings is the index of the tab that was clicked

## Demo page

```
index.html
```
