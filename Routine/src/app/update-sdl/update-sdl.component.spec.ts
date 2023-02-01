import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSdlComponent } from './update-sdl.component';

describe('UpdateSdlComponent', () => {
  let component: UpdateSdlComponent;
  let fixture: ComponentFixture<UpdateSdlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSdlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
