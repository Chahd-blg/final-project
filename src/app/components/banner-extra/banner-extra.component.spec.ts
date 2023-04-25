import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerExtraComponent } from './banner-extra.component';

describe('BannerExtraComponent', () => {
  let component: BannerExtraComponent;
  let fixture: ComponentFixture<BannerExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
