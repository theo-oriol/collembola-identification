import {Directive,HostBinding,HostListener,Output,EventEmitter} from "@angular/core";
  

  
  @Directive({
    selector: "[appDrag]"
  })

  export class DragDirective {
    @Output() files: EventEmitter<FileList> = new EventEmitter();
  
    @HostBinding("style.background") private background = "#eee";
  
    constructor() { }
  
    @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = "#999";
      console.log('🔹 Dragging Over Drop Zone');
    }
  
    @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = "#eee";
      console.log('🔹 Drag Left Drop Zone');
    }
  
    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
      evt.preventDefault();
      evt.stopPropagation();
      this.background = '#eee';
      if (evt.dataTransfer && evt.dataTransfer.files.length > 0) {
        this.files.emit(evt.dataTransfer.files); // ✅ Emit FileList directly
      }else{
      console.log('❌ No files detected in drop event');
      }
    }

    

  }
  