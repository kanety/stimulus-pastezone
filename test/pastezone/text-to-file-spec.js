describe('text to files', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div tabindex="-1" data-controller="pastezone"
                         data-pastezone-text-to-file-value='{"text/plain":"clipboard.txt","*":"clipboard.dat"}'>
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
    $('div').dispatchEvent(createPasteEvent('paste', [
      { kind: 'string', type: 'text/plain', size: 4, data: 'TEXT' },
      { kind: 'string', type: 'text/html', size: 4, data: 'HTML' }
    ]));
  });

  it('sets files', () => {
    expect(files.map(file => file.name)).toEqual(['clipboard.txt', 'clipboard.dat']);
  });
});
