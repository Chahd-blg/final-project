import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssitantInfoComponent } from './assitant-info.component';

describe('AssitantInfoComponent', () => {
  let component: AssitantInfoComponent;
  let fixture: ComponentFixture<AssitantInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssitantInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssitantInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
