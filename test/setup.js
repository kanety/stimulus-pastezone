global.$ = document.querySelector.bind(document);
global.$$ = document.querySelectorAll.bind(document);

import { Application } from '@hotwired/stimulus';
import PastezoneController from 'index';

const application = Application.start();
application.register('pastezone', PastezoneController);

global.createPasteEvent = function(type, files) {
  let event = new CustomEvent(type, { bubbles: true });
  event.clipboardData = {
    items: files.map(file => {
      return {
        kind: 'file',
        type: file.type,
        getAsFile: (_) => {
          return { name: file.name, type: file.type, size: file.size };
        }
      }
    })
  };
  return event;
}

global.DataTransferItems = class {
  constructor() {
    this.items = [];
  }
  get length() {
    return this.items.length;
  }
  add(item) {
    this.items.push(item);
  }
}
global.DataTransfer = class {
  constructor() {
    this.items = new DataTransferItems();
  }
  get files() {
    return this.items.items;
  }
}
