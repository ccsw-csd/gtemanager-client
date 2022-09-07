import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceEmailComponent } from './evidence-email.component';

describe('EvidenceEmailComponent', () => {
  let component: EvidenceEmailComponent;
  let fixture: ComponentFixture<EvidenceEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
