import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVendorOrders } from '../vendor-orders.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../vendor-orders.test-samples';

import { VendorOrdersService } from './vendor-orders.service';

const requireRestSample: IVendorOrders = {
  ...sampleWithRequiredData,
};

describe('VendorOrders Service', () => {
  let service: VendorOrdersService;
  let httpMock: HttpTestingController;
  let expectedResult: IVendorOrders | IVendorOrders[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VendorOrdersService);
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

    it('should create a VendorOrders', () => {
      const vendorOrders = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(vendorOrders).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a VendorOrders', () => {
      const vendorOrders = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(vendorOrders).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a VendorOrders', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of VendorOrders', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a VendorOrders', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addVendorOrdersToCollectionIfMissing', () => {
      it('should add a VendorOrders to an empty array', () => {
        const vendorOrders: IVendorOrders = sampleWithRequiredData;
        expectedResult = service.addVendorOrdersToCollectionIfMissing([], vendorOrders);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vendorOrders);
      });

      it('should not add a VendorOrders to an array that contains it', () => {
        const vendorOrders: IVendorOrders = sampleWithRequiredData;
        const vendorOrdersCollection: IVendorOrders[] = [
          {
            ...vendorOrders,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addVendorOrdersToCollectionIfMissing(vendorOrdersCollection, vendorOrders);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a VendorOrders to an array that doesn't contain it", () => {
        const vendorOrders: IVendorOrders = sampleWithRequiredData;
        const vendorOrdersCollection: IVendorOrders[] = [sampleWithPartialData];
        expectedResult = service.addVendorOrdersToCollectionIfMissing(vendorOrdersCollection, vendorOrders);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vendorOrders);
      });

      it('should add only unique VendorOrders to an array', () => {
        const vendorOrdersArray: IVendorOrders[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const vendorOrdersCollection: IVendorOrders[] = [sampleWithRequiredData];
        expectedResult = service.addVendorOrdersToCollectionIfMissing(vendorOrdersCollection, ...vendorOrdersArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const vendorOrders: IVendorOrders = sampleWithRequiredData;
        const vendorOrders2: IVendorOrders = sampleWithPartialData;
        expectedResult = service.addVendorOrdersToCollectionIfMissing([], vendorOrders, vendorOrders2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(vendorOrders);
        expect(expectedResult).toContain(vendorOrders2);
      });

      it('should accept null and undefined values', () => {
        const vendorOrders: IVendorOrders = sampleWithRequiredData;
        expectedResult = service.addVendorOrdersToCollectionIfMissing([], null, vendorOrders, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(vendorOrders);
      });

      it('should return initial array if no VendorOrders is added', () => {
        const vendorOrdersCollection: IVendorOrders[] = [sampleWithRequiredData];
        expectedResult = service.addVendorOrdersToCollectionIfMissing(vendorOrdersCollection, undefined, null);
        expect(expectedResult).toEqual(vendorOrdersCollection);
      });
    });

    describe('compareVendorOrders', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareVendorOrders(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareVendorOrders(entity1, entity2);
        const compareResult2 = service.compareVendorOrders(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareVendorOrders(entity1, entity2);
        const compareResult2 = service.compareVendorOrders(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareVendorOrders(entity1, entity2);
        const compareResult2 = service.compareVendorOrders(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
