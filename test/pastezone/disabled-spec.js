describe('basic', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div tabindex="-1" data-controller="pastezone">
        <input type="file" multiple disabled>
      </div>
    `;
  });

  let files = [];
  beforeEach(() => {
    Object.defineProperty($('input'), 'files', {
      set: (newFiles) => { files = newFiles; }
    });

    $('div').focus();
    $('div').dispatchEvent(createPasteEvent('paste', [
      { kind: 'file', name: 'file1.txt', type: 'text/plain', size: 1 },
      { kind: 'file', name: 'file2.txt', type: 'text/plain', size: 1 }
    ]));
  });

  it('sets files', () => {
    expect(files.map(file => file.name)).toEqual([]);
  });
});
