import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';

export default class extends Controller {
  static actions = [
    ['element', 'paste->paste']
  ];

  get input() {
    return this.scope.findElement('input[type=file]');
  }

  paste(e) {
    if (this.element.contains(document.activeElement)) {
      let input = this.input;
      let files = this.findFiles(e.clipboardData.items, input.multiple);
      if (files.length && !input.disabled) {
        input.files = files;
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
        this.dispatch('pasted', { detail: { files: files } });
        document.activeElement.blur();
      }
    }
    e.preventDefault();
  }

  findFiles(items, multiple) {
    let files = Array.from(items).filter(item => item.kind == 'file').map(item => item.getAsFile(item.type));
    let dt = new DataTransfer();
    files.forEach(file => {
      if (multiple || dt.items.length < 1) {
        dt.items.add(file);
      }
    });
    return dt.files;
  }
}
