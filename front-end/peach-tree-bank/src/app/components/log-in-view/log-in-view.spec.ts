import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInView } from './log-in-view';

describe('LogInView', () => {
  let component: LogInView;
  let fixture: ComponentFixture<LogInView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogInView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
