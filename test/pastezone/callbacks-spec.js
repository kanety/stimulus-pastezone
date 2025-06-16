describe('calbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div tabindex="-1" data-controller="pastezone">
        <input type="file" multiple>
      </div>
    `;
  });

  let files = [];
  let messages = [];
  beforeEach(() => {
    Object.defineProperty($('input'), 'files', {
      set: (newFiles) => { files = newFiles; }
    });

    $('div').addEventListener('pastezone:pasted', e => {
      e.detail.files.forEach(file => messages.push(file.name));
    });

    $('div').focus();
    $('div').dispatchEvent(createPasteEvent('paste', [
      { kind: 'file', name: 'file1.txt', type: 'text/plain', size: 1 },
      { kind: 'file', name: 'file2.txt', type: 'text/plain', size: 1 }
    ]));
  });

  it('pastes files', () => {
    expect(messages).toEqual(['file1.txt', 'file2.txt']);
  });
});
