import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BesttripStoreComponent } from './besttrip-store.component';

describe('BesttripStoreComponent', () => {
  let component: BesttripStoreComponent;
  let fixture: ComponentFixture<BesttripStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BesttripStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BesttripStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
