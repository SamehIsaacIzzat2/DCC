import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporterInfoComponent } from './exporter-info.component';

describe('ExporterInfoComponent', () => {
  let component: ExporterInfoComponent;
  let fixture: ComponentFixture<ExporterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExporterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExporterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
