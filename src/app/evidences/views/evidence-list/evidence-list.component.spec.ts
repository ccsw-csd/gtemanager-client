import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Center } from '../../model/Center';
import { Evidence } from "../../model/Evidence";
import { Properties } from '../../model/Properties';
import { EvidenceListComponent } from "./evidence-list.component";

describe('EvidenceListComponent', () => {
  let evidenceListComponent: EvidenceListComponent;
  let mockEvidenceService;
  let mockCenterService;
  let mockPropertiesService;
  let mockDynamicDialogService;

  let DATA_LIST = [
    new Evidence({
      id:1,
      person:{
        id:1,
        saga:null,
        username:null,
        email:null,
        name:null,
        lastName:null,
        center:{id:1, name:"CenterA"},
        businessCode:null,
        grade:null,
        active:null
      },
      comment:{
        id:1,
        person:{
          id:1,
          saga:null,
          username:null,
          email:null,
          name:null,
          lastName:null,
          center:{id:1, name:"CenterA"},
          businessCode:null,
          grade:null,
          active:null
          },
        comment:"comment1"
      },
      evidenceTypeW1:null,
      evidenceTypeW2:null,
      evidenceTypeW3:null,
      evidenceTypeW4:null,
      evidenceTypeW5:null,
      evidenceTypeW6:null
      }),
    new Evidence({
      id:2,
      person:{
        id:2,
        saga:null,
        username:null,
        email:null,
        name:null,
        lastName:null,
        center:{id:2, name:"CenterB"},
        businessCode:null,
        grade:null,
        active:null
      },
      comment:null,
      evidenceTypeW1:null,
      evidenceTypeW2:null,
      evidenceTypeW3:null,
      evidenceTypeW4:null,
      evidenceTypeW5:null,
      evidenceTypeW6:null
    })
  ]

  let PROPERTIES_LIST = [
    new Properties({id:1, key:"LOAD_WEEKS", value:"5"})
  ]

  let CENTER_LIST = [
    new Center({id:1, name:"A"})
  ]

  beforeEach(() => {
    mockEvidenceService = jasmine.createSpyObj(["findAll", "getEvidences"]);
    mockCenterService = jasmine.createSpyObj(["findAll"]);
    mockPropertiesService = jasmine.createSpyObj(["findAll"]);
    evidenceListComponent = new EvidenceListComponent(
      mockEvidenceService,
      mockCenterService,
      mockPropertiesService,
      mockDynamicDialogService
    );
  });

  it('findAllShouldReturnEvidences', () => {
    mockPropertiesService.findAll.and.returnValue(of(PROPERTIES_LIST));
    mockCenterService.findAll.and.returnValue(of(CENTER_LIST));
    mockEvidenceService.getEvidences.and.returnValue(of(DATA_LIST));

    evidenceListComponent.findAll();

    expect(evidenceListComponent.evidenceList).toEqual(DATA_LIST);
  });

});