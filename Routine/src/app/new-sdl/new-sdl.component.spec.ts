import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSdlComponent } from './new-sdl.component';

describe('NewSdlComponent', () => {
  let component: NewSdlComponent;
  let fixture: ComponentFixture<NewSdlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSdlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
