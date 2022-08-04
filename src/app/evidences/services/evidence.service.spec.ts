/**
 * Tests para EvidenceService.
 * @author cavire
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

  /** Servicio debería crearse */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /** Servicio debería devolver error con archivo incorrecto */
  it('should return error on invalid file', () => {
    let ok: boolean;
    let file = new Blob([null], { type: "application/pdf" });
    let formData = new FormData;
    formData.append("file", file);
    formData.append("deleteComments", JSON.stringify(false));

    service.upload(formData).subscribe({
      next: result => {
        ok = true;
        console.log("OK");
        expect(result).toBeFalsy();
      },
      error: error => {
        ok = false;
        console.log("KO: " + error.message);
        expect(error).toBeTruthy();
      }
    });

    const request = http.expectOne({
      method: 'PUT',
      url: environment.server + "/evidence",
    });

    request.flush(formData, { status: 400, statusText: 'BAD REQUEST' });

    expect(ok).toBeFalse();
  });

  /** Servicio debería funcionar con archivo correcto */
  it('should return ok on valid file', () => {
    let ok: boolean;
    let file = new Blob([null], { type: "application/vnd.ms-excel" });
    let formData = new FormData;
    formData.append("file", file);
    formData.append("deleteComments", JSON.stringify(false));

    service.upload(formData).subscribe({
      next: result => {
        ok = true;
        console.log("OK");
        expect(result).toBeTruthy();
      },
      error: error => {
        ok = false;
        console.log("KO: " + error.message);
        expect(error).toBeFalsy();
      }
    });

    const request = http.expectOne({
      method: 'PUT',
      url: environment.server + "/evidence",
    });

    request.flush(formData, { status: 200, statusText: 'OK' });

    expect(ok).toBeTrue();
  });
});
