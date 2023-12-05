import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IAdmins } from '../admins.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../admins.test-samples';

import { AdminsService, RestAdmins } from './admins.service';

const requireRestSample: RestAdmins = {
  ...sampleWithRequiredData,
  createdat: sampleWithRequiredData.createdat?.toJSON(),
  updatedat: sampleWithRequiredData.updatedat?.toJSON(),
};

describe('Admins Service', () => {
  let service: AdminsService;
  let httpMock: HttpTestingController;
  let expectedResult: IAdmins | IAdmins[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(AdminsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Admins', () => {
      const admins = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(admins).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Admins', () => {
      const admins = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(admins).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Admins', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Admins', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Admins', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAdminsToCollectionIfMissing', () => {
      it('should add a Admins to an empty array', () => {
        const admins: IAdmins = sampleWithRequiredData;
        expectedResult = service.addAdminsToCollectionIfMissing([], admins);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(admins);
      });

      it('should not add a Admins to an array that contains it', () => {
        const admins: IAdmins = sampleWithRequiredData;
        const adminsCollection: IAdmins[] = [
          {
            ...admins,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAdminsToCollectionIfMissing(adminsCollection, admins);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Admins to an array that doesn't contain it", () => {
        const admins: IAdmins = sampleWithRequiredData;
        const adminsCollection: IAdmins[] = [sampleWithPartialData];
        expectedResult = service.addAdminsToCollectionIfMissing(adminsCollection, admins);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(admins);
      });

      it('should add only unique Admins to an array', () => {
        const adminsArray: IAdmins[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const adminsCollection: IAdmins[] = [sampleWithRequiredData];
        expectedResult = service.addAdminsToCollectionIfMissing(adminsCollection, ...adminsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const admins: IAdmins = sampleWithRequiredData;
        const admins2: IAdmins = sampleWithPartialData;
        expectedResult = service.addAdminsToCollectionIfMissing([], admins, admins2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(admins);
        expect(expectedResult).toContain(admins2);
      });

      it('should accept null and undefined values', () => {
        const admins: IAdmins = sampleWithRequiredData;
        expectedResult = service.addAdminsToCollectionIfMissing([], null, admins, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(admins);
      });

      it('should return initial array if no Admins is added', () => {
        const adminsCollection: IAdmins[] = [sampleWithRequiredData];
        expectedResult = service.addAdminsToCollectionIfMissing(adminsCollection, undefined, null);
        expect(expectedResult).toEqual(adminsCollection);
      });
    });

    describe('compareAdmins', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAdmins(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareAdmins(entity1, entity2);
        const compareResult2 = service.compareAdmins(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareAdmins(entity1, entity2);
        const compareResult2 = service.compareAdmins(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareAdmins(entity1, entity2);
        const compareResult2 = service.compareAdmins(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
