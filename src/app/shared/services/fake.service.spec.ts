import { of, throwError } from 'rxjs';
import { FakeService } from './fake.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('FakeService', () => {
  let service: FakeService;
  let httpClientSky: any;

  beforeEach(() => {
    httpClientSky = {
      get: jest.fn(),
      post: jest.fn()
    };
    service = new FakeService(httpClientSky);
  });

  // Create service
  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test methods
  describe('getDataByIdV1', () => {
    it('Should test getDataByIdV1', () => {
      const id = 1;
      const res = { success: 'Rodrigo' };
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'get').mockReturnValue(of(res));
      service.getDataByIdV1(id);
      expect(httpClientSky.get).toBeCalledTimes(1);
      expect(httpClientSky.get).toHaveBeenCalledWith(url);
    });
  });

  describe('getDataByIdV2', () => {
    it('Should test getDataByIdV2', (done) => {
      const id = 1;
      const dat = 'Rodrigo';
      const res = { success: dat };
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'get').mockReturnValue(of(dat));
      service.getDataByIdV2(id).subscribe({
        next: (data) => {
          expect(data).toEqual(res);
          done();
        },
        error: (error) => console.log(error),
      });
      expect(httpClientSky.get).toBeCalledTimes(1);
      expect(httpClientSky.get).toHaveBeenCalledWith(url);
    });

    it('Should test getDataByIdV2 throw error', (done) => {
      const id = 1;
      const errText = 'Unable to load jsonplaceholder';
      const errData = { error: errText };
      const err = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not found',
      });
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'get').mockReturnValue(throwError(() => errText));
      service.getDataByIdV2(id).subscribe({
        next: (data) => {
          expect(data).toEqual(errData);
          done();
        },
        error: (error) => console.log(error),
      });
      expect(httpClientSky.get).toBeCalledTimes(1);
      expect(httpClientSky.get).toHaveBeenCalledWith(url);
    });
  });

  describe('getDataByIdV3', () => {
    it('Should test getDataByIdV3', (done) => {
      const id = 1;
      const res = 'Rodrigo';
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'get').mockReturnValue(of(res));
      service.getDataByIdV3(id).subscribe({
        next: (data) => {
          expect(data).toEqual(res);
          done();
        },
        error: (error) => console.log(error),
      });
      expect(httpClientSky.get).toBeCalledTimes(1);
      expect(httpClientSky.get).toHaveBeenCalledWith(url);
    });

    it('Should test getDataByIdV3 throw error', (done) => {
      const id = 1;
      const err = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not found',
      });
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'get').mockReturnValue(throwError(() => err));
      service.getDataByIdV3(id).subscribe({
        next: (data) => console.log(data),
        error: (error) => {
          expect(error.message).toContain('test 404 error');
          done();
        },
      });
      expect(httpClientSky.get).toBeCalledTimes(1);
      expect(httpClientSky.get).toHaveBeenCalledWith(url);
    });
  });

  describe('postDataByIdV1', () => {
    it('Should test postDataByIdV1', () => {
      const command = 'testing';
      const id = 1;
      const res = {
        userId: 1,
        id: 1,
        title: 'Rodrigo',
        completed: true
      };
      const data = res;
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'post').mockReturnValue(of(res));
      service.postDataByIdV1(id, data);
      expect(httpClientSky.post).toBeCalledTimes(1);
    });
  });
});
