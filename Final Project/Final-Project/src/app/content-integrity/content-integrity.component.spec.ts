import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentIntegrityComponent } from './content-integrity.component';

describe('ContentIntegrityComponent', () => {
  let component: ContentIntegrityComponent;
  let fixture: ComponentFixture<ContentIntegrityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentIntegrityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentIntegrityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
