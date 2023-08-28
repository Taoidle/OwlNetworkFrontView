import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvViewComponent } from './env-view.component';

describe('EnvViewComponent', () => {
  let component: EnvViewComponent;
  let fixture: ComponentFixture<EnvViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
