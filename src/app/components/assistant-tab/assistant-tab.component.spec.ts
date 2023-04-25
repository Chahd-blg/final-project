import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantTabComponent } from './assistant-tab.component';

describe('AssistantTabComponent', () => {
  let component: AssistantTabComponent;
  let fixture: ComponentFixture<AssistantTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistantTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistantTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
