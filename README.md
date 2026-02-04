# stimulus-pastezone

A stimulus controller to paste clipboard data to input tag using Ctrl+V.

## Dependencies

* @hotwired/stimulus 3.0+

## Installation

Install from npm:

    $ npm install @kanety/stimulus-pastezone --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import PastezoneController from '@kanety/stimulus-pastezone';

const application = Application.start();
application.register('pastezone', PastezoneController);
```

Build html as follows:

```html
<div tabindex="-1" data-controller="pastezone">
  <input type="file">
  <p>Paste here</p>
</div>
```

Pasted file will be set in the input tag.

### Options

#### allow-dirs

Allow directory pasting:

```html
<div tabindex="-1" data-controller="pastezone"
                   data-allow-dirs-value="true">
  <input type="file" multiple>
  <p>Drop here</p>
</div>
```

#### text-to-file

If you want to set text data in the clipboard as a file, set filename per content type as follows:

```html
<div tabindex="-1" data-controller="pastezone"
                   data-pastezone-text-to-file-value='{"text/plain":"clipboard.txt","*":"clipboard.dat"}'>
  <input type="file">
  <p>Paste here</p>
</div>
```

### Callbacks

Run callbacks when clipboard data is pasted:

```javascript
let element = document.querySelector('[data-controller="pastezone"]');
element.addEventListener('pastezone:pasted', e => {
  // e.detail.files are pasted data
  console.log("pasted " + e.detail.files);
});
```

### Limitations

Firefox supports only image data in clipboard. 

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
