import { Component, Input, OnInit, ViewChild,EventEmitter, Output } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-otpcode',
  templateUrl: './otpcode.component.html',
  styleUrls: ['./otpcode.component.scss'],
})
export class OtpcodeComponent implements OnInit {
  @ViewChild('otpInput1') otpInput1: IonInput;
  @ViewChild('otpInput2') otpInput2: IonInput;
  @ViewChild('otpInput3') otpInput3: IonInput;
  @ViewChild('otpInput4') otpInput4: IonInput;

  @Output() getCode = new EventEmitter<string>();
  onfinished() {
    let code = this.icode1 + this.icode2 + this.icode3 + this.icode4;

    this.getCode.emit(code);
    this.icode1 = '';
    this.icode2 = '';
    this.icode3 = '';
    this.icode4 = '';
    this.otpInput1.setFocus();
  }
  icode1: string = '';
  icode2: string = '';
  icode3: string = '';
  icode4: string = '';

  constructor() {}

  ngOnInit() {}

  gotoNextField(nextElement, nub, event) {
    if (event.key.match(/^[0-9]+$/) != null) {
      if (nub == 3) {
        this.onfinished();
      } else {
        nextElement.setFocus();
      }
    } else if (event.key == 'Backspace') {
      switch (nub) {
        case 0:
          return;
        case 1:
          this.otpInput1.setFocus();
          return;
        case 2:
          this.otpInput2.setFocus();
          return;
        case 3:
          this.otpInput3.setFocus();
          return;
        case 4:
          this.otpInput4.setFocus();
          return;
      }
    } else {
      // console.log(event);
      event.preventDefault();
    }
  }

  keyDown(event) {
    if (event.key.match(/^[0-9]+$/) != null || event.key == 'Backspace') {
      return;
    } else {
      event.preventDefault();
    }
  }

  focus(num: number) {
    if (this.icode1 == null || this.icode1 == undefined) {
      this.icode1 = '';
    }
    switch (num) {
      case 1:
        this.otpInput1.setFocus();
        return;
      case 2:
        if (this.icode1 == '') {
          this.otpInput1.setFocus();
          return;
        }
        this.otpInput2.setFocus();
        return;
      case 3:
        if (this.icode1 == '') {
          this.otpInput1.setFocus();
          return;
        }
        this.otpInput3.setFocus();
        return;
      case 4:
        if (this.icode1 == '') {
          this.otpInput1.setFocus();
          return;
        }
        this.otpInput4.setFocus();
        return;
    }
  }
}
