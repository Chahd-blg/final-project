import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistancesComponent } from './assistances.component';

describe('AssistancesComponent', () => {
  let component: AssistancesComponent;
  let fixture: ComponentFixture<AssistancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
