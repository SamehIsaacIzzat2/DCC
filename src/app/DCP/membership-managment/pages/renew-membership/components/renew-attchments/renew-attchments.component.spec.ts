import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewAttchmentsComponent } from './renew-attchments.component';

describe('RenewAttchmentsComponent', () => {
  let component: RenewAttchmentsComponent;
  let fixture: ComponentFixture<RenewAttchmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewAttchmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewAttchmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
