import {customElement, bindable, containerless} from 'aurelia-framework';

@customElement('form-submit')
@containerless()
export class FormSubmit {
  @bindable label;
}
