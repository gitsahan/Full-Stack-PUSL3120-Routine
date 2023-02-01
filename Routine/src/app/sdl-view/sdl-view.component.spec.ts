import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SdlViewComponent } from './sdl-view.component';

describe('SdlViewComponent', () => {
  let component: SdlViewComponent;
  let fixture: ComponentFixture<SdlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SdlViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SdlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
