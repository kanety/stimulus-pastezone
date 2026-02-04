export default class {
  constructor(options = {}) {
    this.options = options;
  }

  scan(clipboardData) {
    const files = []
    Array.from(clipboardData.items).forEach(item => {
      if (item.kind === 'string') {
        const data = clipboardData.getData(item.type);
        const filename = this.filenameFor(item.type);
        if (filename) files.push(this.createFile(data, filename, item.type));
      }
    });
    return files;
  }

  filenameFor(type) {
    return this.options.textToFile[type] || this.options.textToFile['*'];
  }

  createFile(data, filename, type) {
    const blob = new Blob([data], { type: type });
    return new File([blob], filename, { type: type });
  }
}
