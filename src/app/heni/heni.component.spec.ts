import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeniComponent } from './heni.component';

describe('HeniComponent', () => {
  let component: HeniComponent;
  let fixture: ComponentFixture<HeniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
