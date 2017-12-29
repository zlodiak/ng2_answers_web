import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[awDropMenu]'
})
export class DropMenuDirective {

  @HostBinding('class.open')
  private isOpen: boolean = false;

  @HostListener('click') onClick() {
    console.log('drop');
    this.isOpen = !this.isOpen;
  }

}
