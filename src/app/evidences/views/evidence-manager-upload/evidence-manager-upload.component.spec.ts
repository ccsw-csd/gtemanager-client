import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceManagerUploadComponent } from './evidence-manager-upload.component';

describe('EvidenceManagerUploadComponent', () => {
  let component: EvidenceManagerUploadComponent;
  let fixture: ComponentFixture<EvidenceManagerUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceManagerUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceManagerUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
