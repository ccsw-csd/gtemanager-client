/**
 * Tests para EvidenceService.
 */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { EvidenceService } from './evidence.service';

describe('EvidenceService', () => {
  let service: EvidenceService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(EvidenceService);
    http = TestBed.inject(HttpTestingController);
  });

  /**
   * Servicio debería crearse.
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   *  Servicio debería devolver error con archivo incorrecto.
   */
  it('should return error on invalid file', () => {
    let ok: boolean;
    let file = new Blob([null], { type: "application/pdf" });
    let formData = new FormData;
    formData.append("file", file);
    formData.append("deleteComments", JSON.stringify(false));

    service.uploadEvidence(formData).subscribe({
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
      url: environment.server + "/evidence",
    }).flush(formData, { status: 400, statusText: 'BAD REQUEST' });

    expect(ok).toBeFalse();
  });

  /**
   *  Servicio debería funcionar con archivo correcto.
   */
  it('should return ok on valid file', () => {
    let ok: boolean;
    let file = new Blob([null], { type: "application/vnd.ms-excel" });
    let formData = new FormData;
    formData.append("file", file);
    formData.append("deleteComments", JSON.stringify(false));

    service.uploadEvidence(formData).subscribe({
      next: result => {
        ok = true;
        expect(result).toBeTruthy();
      },
      error: error => {
        ok = false;
        expect(error).toBeFalsy();
      }
    });

    http.expectOne({
      method: 'POST',
      url: environment.server + "/evidence",
    }).flush(formData, { status: 200, statusText: 'OK' });

    expect(ok).toBeTrue();
  });
});
