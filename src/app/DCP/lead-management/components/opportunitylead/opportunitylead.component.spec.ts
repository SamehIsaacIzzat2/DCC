import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityleadComponent } from './opportunitylead.component';

describe('OpportunityleadComponent', () => {
  let component: OpportunityleadComponent;
  let fixture: ComponentFixture<OpportunityleadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityleadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityleadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
