import { Controller } from '@hotwired/stimulus';
import '@kanety/stimulus-static-actions';

export default class extends Controller {
  static values = {
    textToFile: Object
  };
  static actions = [
    ['element', 'paste->paste']
  ];

  get input() {
    return this.scope.findElement('input[type=file]');
  }

  paste(e) {
    if (this.element != document.activeElement) return;

    let input = this.input;
    let files = this.convertToFiles(e.clipboardData);
    let dt = this.buildDataTransfer(files, input.multiple);

    if (dt.files.length) {
      if (!input.disabled) {
        this.setFiles(input, dt.files);
        document.activeElement.blur();
      }
      e.preventDefault();
    }
  }

  convertToFiles(clipboardData) {
    let files = []
    Array.from(clipboardData.items).forEach(item => {
      if (item.kind == 'file') {
        files.push(item.getAsFile(item.type));
      } else {
        let data = clipboardData.getData(item.type);
        let filename = this.filenameFor(item.type);
        if (filename) files.push(this.convertToFile(data, filename, item.type));
      }
    });
    return files;
  }

  filenameFor(type) {
    return this.textToFileValue[type] || this.textToFileValue['*'];
  }

  convertToFile(data, filename, type) {
    let blob = new Blob([data], { type: type });
    return new File([blob], filename, { type: type });
  }

  buildDataTransfer(files, multiple) {
    let dt = new DataTransfer();
    files.forEach(file => {
      if (multiple || dt.items.length < 1) {
        dt.items.add(file);
      }
    });
    return dt;
  }

  setFiles(input, files) {
    input.files = files;
    input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
    this.dispatch('pasted', { detail: { files: files } });
  }
}
