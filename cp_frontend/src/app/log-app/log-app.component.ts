import { Component, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-log-app',
  templateUrl: './log-app.component.html',
  styleUrls: ['./log-app.component.css']
})
export class LogAppComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngAfterViewInit() {
    const formInputs = this.el.nativeElement.querySelectorAll('.form input, .form textarea');
    formInputs.forEach((input: any) => {
      this.renderer.listen(input, 'keyup', (event) => this.handleInputEvent(event));
      this.renderer.listen(input, 'blur', (event) => this.handleInputEvent(event));
      this.renderer.listen(input, 'focus', (event) => this.handleInputEvent(event));
    });

    const tabLinks = this.el.nativeElement.querySelectorAll('.tab a');
    tabLinks.forEach((link: any) => {
      this.renderer.listen(link, 'click', (event) => this.handleTabClick(event));
    });
  }

  handleInputEvent(event: Event) {
    const input = event.target as HTMLInputElement;
    const label = input.previousElementSibling;

    if (event.type === 'keyup') {
      if (input.value === '') {
        label?.classList.remove('active', 'highlight');
      } else {
        label?.classList.add('active', 'highlight');
      }
    } else if (event.type === 'blur') {
      if (input.value === '') {
        label?.classList.remove('active', 'highlight');
      } else {
        label?.classList.remove('highlight');
      }
    } else if (event.type === 'focus') {
      if (input.value === '') {
        label?.classList.remove('highlight');
      } else {
        label?.classList.add('highlight');
      }
    }
  }

  handleTabClick(event: Event) {
    event.preventDefault();

    const tabLink = event.target as HTMLAnchorElement;
    const tab = tabLink.parentElement;

    tab?.classList.add('active');
    const siblings = Array.from(tab?.parentElement?.children || []);
    siblings.forEach((sibling) => {
      if (sibling !== tab) {
        sibling.classList.remove('active');
      }
    });

    const target = tabLink.getAttribute('href');
    const tabContents = this.el.nativeElement.querySelectorAll('.tab-content > div');
    tabContents.forEach((content: { id: string | null; }) => {
      if (content.id === target) {
        this.renderer.setStyle(content, 'display', 'block');
      } else {
        this.renderer.setStyle(content, 'display', 'none');
      }
    });

  }
}
