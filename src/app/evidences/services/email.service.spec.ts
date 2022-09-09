/**
 * Tests para EmailService.
 */

import { DatePipe } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DatePipe
      ]
    });
    service = TestBed.inject(EmailService);
    http = TestBed.inject(HttpTestingController);
  });

  /**
   * Servicio debería crearse.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   *  Servicio debería devolver error con parámetros incorrectos.
   */
  it('should return error on invalid data', () => {
    let ok: boolean;

    let closingDate = new Date("2020-12-09");
    let centerId = 3;

    service.sendEmails(closingDate, centerId).subscribe({
      next: result => {
        ok = true;
        expect(result).toBeFalsy();
      },
      error: error => {
        ok = false;
        expect(error).toBeTruthy();
      }
    });

    http.expectOne({
      method: 'POST',
      url: service.composeUrl(closingDate, centerId),
    }).flush(null, { status: 400, statusText: 'BAD REQUEST' });

    expect(ok).toBeFalse();


    closingDate = new Date("2022-12-09");
    centerId = 0;

    service.sendEmails(closingDate, centerId).subscribe({
      next: result => {
        ok = true;
        expect(result).toBeFalsy();
      },
      error: error => {
        ok = false;
        expect(error).toBeTruthy();
      }
    });

    http.expectOne({
      method: 'POST',
      url: service.composeUrl(closingDate, centerId),
    }).flush(null, { status: 400, statusText: 'BAD REQUEST' });

    expect(ok).toBeFalse();


    closingDate = new Date("2020-12-09");
    centerId = 0;

    service.sendEmails(closingDate, centerId).subscribe({
      next: result => {
        ok = true;
        expect(result).toBeFalsy();
      },
      error: error => {
        ok = false;
        expect(error).toBeTruthy();
      }
    });

    http.expectOne({
      method: 'POST',
      url: service.composeUrl(closingDate, centerId),
    }).flush(null, { status: 400, statusText: 'BAD REQUEST' });

    expect(ok).toBeFalse();
  });

  /**
   *  Servicio debería funcionar con datos correctos.
   */
  it('should return ok on valid data', () => {
    let ok: boolean;

    let closingDate = new Date("2022-12-09");
    let centerId = 3;

    service.sendEmails(closingDate, centerId).subscribe({
      next: result => {
        ok = true;
        expect(result).toBeFalsy();
      },
      error: error => {
        ok = false;
        expect(error).toBeFalsy();
      }
    });

    http.expectOne({
      method: 'POST',
      url: service.composeUrl(closingDate, centerId),
    }).flush(null, { status: 200, statusText: 'OK' });

    expect(ok).toBeTrue();
  });
});
