import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardLoaderComponent } from './list-card-loader.component';

describe('ListCardLoaderComponent', () => {
  let component: ListCardLoaderComponent;
  let fixture: ComponentFixture<ListCardLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCardLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
