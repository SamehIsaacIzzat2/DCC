import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityWidgetComponent } from './opportunity-widget.component';

describe('OpportunityWidgetComponent', () => {
  let component: OpportunityWidgetComponent;
  let fixture: ComponentFixture<OpportunityWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
