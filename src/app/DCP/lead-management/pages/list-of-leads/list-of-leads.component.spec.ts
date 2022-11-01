import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLeadsComponent } from './list-of-leads.component';

describe('ListOfLeadsComponent', () => {
  let component: ListOfLeadsComponent;
  let fixture: ComponentFixture<ListOfLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfLeadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
