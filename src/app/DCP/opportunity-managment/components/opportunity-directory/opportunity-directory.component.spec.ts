import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityDirectoryComponent } from './opportunity-directory.component';

describe('OpportunityDirectoryComponent', () => {
  let component: OpportunityDirectoryComponent;
  let fixture: ComponentFixture<OpportunityDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
