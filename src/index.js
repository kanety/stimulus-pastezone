import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';
import StringScanner from './string-scanner.js';
import FileScanner from './file-scanner.js';

export default class extends Controller {
  static values = {
    textToFile: Object,
    allowDirs: Boolean
  };
  static actions = [
    ['element', 'paste->paste']
  ];

  get input() {
    return this.scope.findElement('input[type=file]');
  }

  async paste(e) {
    if (this.element != document.activeElement) return;
    if (this.input.disabled) return;

    const files = [];

    if (this.hasTextToFileValue) {
      const stringScanner = new StringScanner({ textToFile: this.textToFileValue });
      files.push(...stringScanner.scan(e.clipboardData));
    }

    const scanner = new FileScanner({ allowDirs: this.allowDirsValue });
    files.push(...await scanner.scan(e.clipboardData.items));

    if (files.length) {
      this.setFiles(files);
      document.activeElement.blur();
      e.preventDefault();
    }
  }

  setFiles(files) {
    const input = this.input;
    const dt = this.buildDataTransfer(files);
    input.files = dt.files;
    input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    this.dispatch('pasted', { detail: { files: files } });
  }

  buildDataTransfer(files) {
    let dt = new DataTransfer();
    files.forEach(file => {
      if (this.input.multiple || dt.items.length < 1) {
        dt.items.add(file);
      }
    });
    return dt;
  }
}
