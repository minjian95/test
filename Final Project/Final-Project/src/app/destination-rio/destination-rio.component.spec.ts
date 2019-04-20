import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationRioComponent } from './destination-rio.component';

describe('DestinationRioComponent', () => {
  let component: DestinationRioComponent;
  let fixture: ComponentFixture<DestinationRioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationRioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationRioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
