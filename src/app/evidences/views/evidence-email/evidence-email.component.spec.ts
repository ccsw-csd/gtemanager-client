/**
 * Tests para EvidenceEmail.
 */

import { DatePipe } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { environment } from 'src/environments/environment';
import { Center } from '../../models/Center';
import { Reminder } from '../../models/Reminder';
import { CenterService } from '../../services/center.service';
import { EmailService } from '../../services/email.service';

import { EvidenceEmailComponent } from './evidence-email.component';

describe('EvidenceEmailComponent', () => {
  let component: EvidenceEmailComponent;
  let fixture: ComponentFixture<EvidenceEmailComponent>;

  let mockEmailService;
  let mockCenterService;
  let http: HttpTestingController;

  let centerList = [
    new Center({ id: 1, name: 'Madrid' }),
    new Center({ id: 2, name: 'Barcelona' }),
    new Center({ id: 3, name: 'Valencia' })
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EvidenceEmailComponent
      ],
      imports: [
        HttpClientTestingModule,
        ButtonModule,
        DynamicDialogModule,
        FormsModule,
        ToastModule
      ],
      providers: [
        EmailService,
        CenterService,
        DynamicDialogRef,
        DynamicDialogConfig,
        SnackbarService,
        MessageService,
        DatePipe
      ]
    })
      .compileComponents();

    mockEmailService = jasmine.createSpyObj("EmailService", ["sendEmails"]);
    mockCenterService = jasmine.createSpyObj("CenterService", ["getCenters"]);
    fixture = TestBed.createComponent(EvidenceEmailComponent);
    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Componente debería enviar datos válidos.
   */
  it('should send emails on valid data', () => {
    let spyClose = spyOn(component, "close");
    mockCenterService.getCenters.and.returnValue(of(centerList));
    component.isLoading = false;

    component.closingDate = new Date("2022-12-09");
    component.center = centerList[2];

    expect(component.isLoading).toBe(false);

    component.onSend();

    fixture.detectChanges();
    expect(component.isLoading).toBe(true);

    let reminder = new Reminder();
    reminder.closingDate = component.closingDate;
    reminder.centerId = component.center.id;

    http.expectOne({
      method: 'POST',
      url: environment.server + "/email/sendReminders"
    }).flush(reminder, { status: 200, statusText: 'OK' });

    fixture.detectChanges();
    expect(component.isLoading).toBe(false);

    mockEmailService.sendEmails(component.closingDate, component.center.id);

    expect(mockEmailService.sendEmails).toHaveBeenCalledWith(component.closingDate, component.center.id);
    expect(spyClose).toHaveBeenCalled();

    fixture.detectChanges();
    expect(component.isLoading).toBe(false);
  });

  /**
   * Componente debería cerrarse al cancelar.
   */
  it('should close on cancel', () => {
    let spyClose = spyOn(component, "close");
    component.onCancel();

    expect(spyClose).toHaveBeenCalled();
  });
});
