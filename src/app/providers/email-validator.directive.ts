import { Directive, Input, OnInit, ElementRef } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  FormGroup,
  AbstractControl,
} from "@angular/forms";

import { CustomValidationService } from "./custom-validation.service";

@Directive({
  selector: "[validPassword]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordDirective, multi: true },
  ],
})
export class PasswordDirective implements Validator, OnInit {
  // @Input("validPassword") validPassword: string[] = [];

  constructor(
    private customValidator: CustomValidationService,
    private eRef: ElementRef
  ) {}
  ngOnInit() {
    console.log("bla");
  }
  validate(control): { [key: string]: any } | null {
    console.log(".....");
    return this.customValidator.patternValidator()(control);
  }
}
