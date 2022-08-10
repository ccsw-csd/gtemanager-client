/**
 * Tests para EvidenceUpload.
 * @author cavire
 */

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EvidenceService } from '../../services/evidence.service';

import { EvidenceUploadComponent } from './evidence-upload.component';

describe('EvidenceUploadComponent', () => {
  let component: EvidenceUploadComponent;
  let fixture: ComponentFixture<EvidenceUploadComponent>;
  let debugElement: DebugElement;

  let mockEvidenceService;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EvidenceUploadComponent
      ],
      imports: [
        HttpClientTestingModule,
        ButtonModule,
        FileUploadModule,
        DynamicDialogModule,
        CheckboxModule,
        FormsModule,
        MessagesModule,
        MessageModule,
        ToastModule
      ],
      providers: [
        EvidenceService,
        DynamicDialogRef,
        DynamicDialogConfig,
        MessageService
      ]
    })
      .compileComponents();

    mockEvidenceService = jasmine.createSpyObj(["uploadEvidence"]);
    fixture = TestBed.createComponent(EvidenceUploadComponent);
    debugElement = fixture.debugElement;

    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, "close");
    spyOn(component, "onRemove");
  });

  /**
   * Componente debería tener archivo seleccionado.
   */
  it('should select file', () => {
    let files: File[] = [];
    let event = { files };
    event.files.push(new File([new Blob([null], { type: "application/vnd.ms-excel" })], "text.xls"));
    component.onSelect(event);

    expect(component.file).toBeTruthy();
  });

  /**
   * Componente debería eliminar archivo seleccionado.
   */
  it('should remove file', () => {
    component.onRemove(null);

    expect(component.onRemove).toHaveBeenCalled();
    expect(component.file).toBeFalsy();
    expect(component.deleteComments).toBeFalse();
  });

  /**
   * Componente debería importar archivo válido.
   */
  it('should import valid file', () => {
    let files: File[] = [];
    let event = { files };
    component.file = null;
    event.files.push(new File([null], "test.xls", { type: "application/vnd.ms-excel" }));
    component.file = event.files[0];
    component.deleteComments = true;
    component.onImport(event);

    let formData = new FormData;
    formData.append("file", component.file);
    formData.append("deleteComments", JSON.stringify(component.deleteComments));
    http.expectOne({
      method: 'PUT',
      url: environment.server + "/evidence",
    }).flush(formData);

    mockEvidenceService.uploadEvidence.and.returnValue(of(true));

    expect(mockEvidenceService.uploadEvidence(formData)).toBeTruthy();
    expect(mockEvidenceService.uploadEvidence).toHaveBeenCalledWith(formData);
    expect(component.onRemove).not.toHaveBeenCalled();
    expect(component.close).toHaveBeenCalled();
  });

  /**
   * Componente no debería importar archivo no válido.
   */
  it('should not import invalid file', () => {
    let files: File[] = [];
    let event = { files };
    component.file = null;
    event.files.push(new File([null], "test.pdf", { type: "application/pdf" }));
    component.file = event.files[0];
    component.deleteComments = true;
    component.onImport(event);

    expect(mockEvidenceService.uploadEvidence).not.toHaveBeenCalled();
    expect(component.onRemove).toHaveBeenCalled();
    expect(component.close).not.toHaveBeenCalled();
  });

  /**
   * Componente debería cerrarse al cancelar.
   */
  it('should close on cancel', () => {
    component.onCancel(null);

    expect(component.close).toHaveBeenCalled();
  });
});
