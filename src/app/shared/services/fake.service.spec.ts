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
  describe('getDataByFixedId', () => {
    it('Should test getDataByFixedId', () => {
      const res = { success: 'Rodrigo' };
      const url = `https://jsonplaceholder.typicode.com/todos/1`;
      jest.spyOn(httpClientSky, 'get').mockReturnValue(of(res));
      service.getDataByFixedId();
      expect(httpClientSky.get).toBeCalledTimes(1);
      expect(httpClientSky.get).toHaveBeenCalledWith(url);
    });
  });

  describe('getDataByIdWithMap', () => {
    it('Should test getDataByIdWithMap', (done) => {
      const id = 1;
      const dat = 'Rodrigo';
      const res = { success: dat };
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'get').mockReturnValue(of(dat));
      service.getDataByIdWithMap(id).subscribe({
        next: (data) => {
          expect(data).toEqual(res);
          done();
        },
        error: (error) => console.log(error),
      });
      expect(httpClientSky.get).toBeCalledTimes(1);
      expect(httpClientSky.get).toHaveBeenCalledWith(url);
    });

    it('Should test getDataByIdWithMap throw error', (done) => {
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
      service.getDataByIdWithMap(id).subscribe({
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

  describe('getDataByIdWithHandleError', () => {
    it('Should test getDataByIdWithHandleError', (done) => {
      const id = 1;
      const res = 'Rodrigo';
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'get').mockReturnValue(of(res));
      service.getDataByIdWithHandleError(id).subscribe({
        next: (data) => {
          expect(data).toEqual(res);
          done();
        },
        error: (error) => console.log(error),
      });
      expect(httpClientSky.get).toBeCalledTimes(1);
      expect(httpClientSky.get).toHaveBeenCalledWith(url);
    });

    it('Should test getDataByIdWithHandleError throw error', (done) => {
      const id = 1;
      const err = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not found',
      });
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'get').mockReturnValue(throwError(() => err));
      service.getDataByIdWithHandleError(id).subscribe({
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
        completed: true,
        time: 10,
      };
      const data = res;
      const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
      jest.spyOn(httpClientSky, 'post').mockReturnValue(of(res));
      service.postDataByIdV1(id, data);
      expect(httpClientSky.post).toBeCalledTimes(1);
    });
  });
});
