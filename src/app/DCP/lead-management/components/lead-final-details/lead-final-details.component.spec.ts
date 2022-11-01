import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadFinalDetailsComponent } from './lead-final-details.component';

describe('LeadFinalDetailsComponent', () => {
  let component: LeadFinalDetailsComponent;
  let fixture: ComponentFixture<LeadFinalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadFinalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadFinalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
