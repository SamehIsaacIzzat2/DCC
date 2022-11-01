import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewCompanyInfoComponent } from './renew-company-info.component';

describe('RenewCompanyInfoComponent', () => {
  let component: RenewCompanyInfoComponent;
  let fixture: ComponentFixture<RenewCompanyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewCompanyInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewCompanyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
