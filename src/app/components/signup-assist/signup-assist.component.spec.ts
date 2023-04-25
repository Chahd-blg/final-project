import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAssistComponent } from './signup-assist.component';

describe('SignupAssistComponent', () => {
  let component: SignupAssistComponent;
  let fixture: ComponentFixture<SignupAssistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupAssistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
