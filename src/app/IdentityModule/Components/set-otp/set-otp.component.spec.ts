import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOTPComponent } from './set-otp.component';

describe('SetOTPComponent', () => {
  let component: SetOTPComponent;
  let fixture: ComponentFixture<SetOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetOTPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
