import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return error on invalid file', () => {
    let ok: boolean;
    let file = new Blob([null], { type: "application/pdf" });
    let formData = new FormData;
    formData.append("file", file);
    formData.append("deleteComments", JSON.stringify(false));

    service.upload(formData).subscribe(
      result => {
        ok = true;
        console.log("OK");
        expect(result).toBeFalsy();
      },
      error => {
        ok = false;
        console.log("KO: " + error.message);
        expect(error).toBeTruthy();
      }
    );

    const request = http.expectOne({
      method: 'PUT',
      url: "http://localhost:8080/evidence",
    });

    request.flush(formData, { status: 400, statusText: 'Bad Request' });

    expect(ok).not.toEqual(true);
  });

  it('should return ok on valid file', () => {
    let ok: boolean;
    let file = new Blob([null], { type: "application/vnd.ms-excel" });
    let formData = new FormData;
    formData.append("file", file);
    formData.append("deleteComments", JSON.stringify(false));

    service.upload(formData).subscribe(
      result => {
        ok = true;
        console.log("OK");
        expect(result).toBeTruthy();
      },
      error => {
        ok = false;
        console.log("KO: " + error.message);
        expect(error).toBeFalsy();
      }
    );

    const request = http.expectOne({
      method: 'PUT',
      url: "http://localhost:8080/evidence",
    });

    request.flush(formData);

    expect(ok).toEqual(true);
  });
});
