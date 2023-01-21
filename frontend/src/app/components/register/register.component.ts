import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbStepChangeEvent, NbStepperComponent } from '@nebular/theme';
import { AuthResult } from 'src/app/models/auth-result';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: User = new User();
  linearMode = true;

  @ViewChild("stepper") stepper: NbStepperComponent;

  constructor(protected service: SessionService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    public userService: UserService) {

  }

  registerOne() {
    this.userService.checkEmailUnique(this.user.email).subscribe(res => {
      if (res.status) {
        this.stepper.next();
        this.errors = [];
      }
      else {
        this.errors.push('Email must be Unique')
      }
    })
  }

  registerTwo() {
    this.register();
  }

  handleStepChange(e: NbStepChangeEvent): void {
    this.stepper.previous();
  }

  register(): void {
    this.errors = this.messages = [];
    this.submitted = true;
    this.service.register(this.user).subscribe((result: any) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, 10);
      }
      this.cd.detectChanges();
    });
  }
}
