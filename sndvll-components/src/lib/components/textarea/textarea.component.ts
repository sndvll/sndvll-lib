import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, forwardRef,
  HostBinding, Input,
  Output,
  ViewChild
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const TEXTAREA_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaComponent),
  multi: true
}

@Component({
  selector: 'sndvll-textarea',
  templateUrl: './textarea.component.html',
  providers: [TEXTAREA_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent implements ControlValueAccessor {

  private _disabled: boolean = false;
  private _value = new BehaviorSubject<string>('');
  public value$ = this._value.asObservable();

  @Output() public onValueChanges = new EventEmitter<string>();

  @ViewChild('textarea') textarea!: ElementRef;

  @HostBinding('class') classList = 'textarea-component';

  @Output() placeholder: string = '';

  @Input() set value(value: string) {
    this._value.next(value);
    this.onValueChanges.emit(value);
    this._controlValueAccessorChangeFn(value);
    this.changeDetectorRef.markForCheck();
  }

  @Input() set disabled(value: boolean) {
    this._disabled = value != null && `${value} ` !== 'false';
  }
  get disabled(): boolean {
    return this._disabled;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  public change(value: string) {
    this.value = value;
  }

  private _onTouched: () => any = () => {};
  private _controlValueAccessorChangeFn: (value: any) => void = () => {};

  registerOnChange(fn: any): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    this.changeDetectorRef.markForCheck();
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value;
    }
  }



}
