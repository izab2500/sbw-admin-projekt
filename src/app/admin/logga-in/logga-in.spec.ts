import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggaIn } from './logga-in';

describe('LoggaIn', () => {
  let component: LoggaIn;
  let fixture: ComponentFixture<LoggaIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggaIn],
    }).compileComponents();

    fixture = TestBed.createComponent(LoggaIn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
