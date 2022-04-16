# stimulus-pastezone

A stimulus controller to paste clipboard data to input tag using Ctrl+V.

## Dependencies

* @hotwired/stimulus 3.0

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

Pasted clipboard data will be set in the input tag:

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
