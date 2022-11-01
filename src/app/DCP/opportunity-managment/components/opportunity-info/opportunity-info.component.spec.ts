import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityInfoComponent } from './opportunity-info.component';

describe('OpportunityInfoComponent', () => {
  let component: OpportunityInfoComponent;
  let fixture: ComponentFixture<OpportunityInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
