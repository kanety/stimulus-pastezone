describe('allow-dirs', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div tabindex="-1" data-controller="pastezone"
                         data-pastezone-allow-dirs-value="true">
        <input type="file" multiple>
      </div>
    `;
  });

  let files = [];
  beforeEach(() => {
    Object.defineProperty($('input'), 'files', {
      set: (newFiles) => { files = newFiles; }
    });

    $('div').focus();
    $('div').dispatchEvent(createModernPasteEvent('paste', [
      { kind: 'file', name: 'file1.txt', type: 'text/plain' },
      { kind: 'file', name: 'directory', type: '', entries: [
        { kind: 'file', name: 'file2.txt', type: 'text/plain', size: 1 },
        { kind: 'file', name: 'file3.txt', type: 'text/plain', size: 1 }
      ] }
    ]));
  });

  it('sets files', () => {
    expect(files.map(file => file.name)).toEqual(['file1.txt', 'file2.txt', 'file3.txt']);
    expect(files.map(file => file.path)).toEqual(['file1.txt', 'directory/file2.txt', 'directory/file3.txt']);
  });
});
