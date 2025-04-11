import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterBillComponent } from './enter-bill.component';

describe('EnterBillComponent', () => {
  let component: EnterBillComponent;
  let fixture: ComponentFixture<EnterBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
