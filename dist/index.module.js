import{Controller as e}from"@hotwired/stimulus";import"@kanety/stimulus-static-actions";class t extends e{get input(){return this.scope.findElement("input[type=file]")}paste(e){if(this.element==document.activeElement){var t=this.input,i=this.findFiles(e.clipboardData.items,t.multiple);i.length&&(t.disabled||(t.files=i,t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0})),this.dispatch("pasted",{detail:{files:i}}),document.activeElement.blur()),e.preventDefault())}}findFiles(e,t){var i=Array.from(e).filter(e=>"file"==e.kind).map(e=>e.getAsFile(e.type)),s=new DataTransfer;return i.forEach(e=>{(t||s.items.length<1)&&s.items.add(e)}),s.files}}t.actions=[["element","paste->paste"]];export{t as default};
//# sourceMappingURL=index.module.js.map
