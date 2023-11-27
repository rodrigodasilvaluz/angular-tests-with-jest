import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataComponent } from './data.component';
import { FakeService } from '@app/shared/services/fake.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock: any;
  let fakeActivatedRouteMock: any;

  beforeEach(async () => {
    // Mock service
    fakeServiceMock = {
      getDataByFixedId: jest.fn(),
      // getDataByIdWithMap: jest.fn(),
    };

    // Mock route
    fakeActivatedRouteMock = {
      snapshot: {
        paramMap: convertToParamMap({
          id: '1',
        }),
      },
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [DataComponent],
      providers: [
        {
          provide: FakeService,
          useValue: fakeServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRouteMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  // Test create component
  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should assign org when route is resolved', () => {});

  // Test methods
  describe('getServiceData set serviceData and errorMessage', () => {
    it('Should getServiceData set serviceData', () => {
      // Arrange
      const expected = {
        title: 'Rodrigo',
      };

      // Act
      jest.spyOn(fakeServiceMock, 'getDataByFixedId').mockReturnValue(of(expected));
      // component.getServiceData();
      fixture.detectChanges();

      // Assert
      expect(component.serviceData?.title).toBe(expected.title);
    });

    it('Should getServiceData set errorMessage', () => {
      // Arrange
      const errorMessage = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not found',
      });

      // Act
      jest.spyOn(fakeServiceMock, 'getDataByFixedId').mockReturnValue(throwError(() => errorMessage));
      // component.getServiceData();
      fixture.detectChanges();

      // Assert
      expect(component.errorServise).toBe('Not found');
    });
  });

  // describe('getServiceDataWithMap set serviceData and errorMessage', () => {
  //   it('Should getDataByIdWithMap set serviceData', () => {
  //     // Arrange
  //     const expected = {
  //       success: {
  //         title: 'Rodrigo',
  //       },
  //     };

  //     // Act
  //     jest.spyOn(fakeServiceMock, 'getDataByIdWithMap').mockReturnValue(of(expected));
  //     component.getServiceDataWithMap();

  //     // Assert
  //     expect(component.serviceDataWithMap.success?.title).toBe(expected.success.title);
  //   });

  //   it('Should getServiceDataWithMap set errorMessage', () => {
  //     // Arrange
  //     const errorMessage = new HttpErrorResponse({
  //       error: 'test 404 error',
  //       status: 404,
  //       statusText: 'Not found',
  //     });

  //     // Act
  //     jest.spyOn(fakeServiceMock, 'getDataByIdWithMap').mockReturnValue(throwError(() => errorMessage));
  //     component.getServiceDataWithMap();

  //     // Assert
  //     expect(component.errorServise).toBe('Not found');
  //   });
  // });

  // Test branches
  describe('getServiceData set greeting', () => {
    it('Should getServiceData set "Good morning" in greeting', () => {
      // Arrange
      const data = {
        title: 'Rodrigo',
        time: 9,
      };
      const expected = 'Good morning';

      // Act
      jest.spyOn(fakeServiceMock, 'getDataByFixedId').mockReturnValue(of(data));
      // component.getServiceData();
      fixture.detectChanges();

      // Assert
      expect(component.greeting).toBe(expected);
    });

    it('Should getServiceData set "Good day" in greeting', () => {
      // Arrange
      const data = {
        title: 'Rodrigo',
        time: 15,
      };
      const expected = 'Good day';

      // Act
      jest.spyOn(fakeServiceMock, 'getDataByFixedId').mockReturnValue(of(data));
      // component.getServiceData();
      fixture.detectChanges();

      // Assert
      expect(component.greeting).toBe(expected);
    });

    it('Should getServiceData set "Good evening" in greeting', () => {
      // Arrange
      const data = {
        title: 'Rodrigo',
        time: 22,
      };
      const expected = 'Good evening';

      // Act
      jest.spyOn(fakeServiceMock, 'getDataByFixedId').mockReturnValue(of(data));
      // component.getServiceData();
      fixture.detectChanges();

      // Assert
      expect(component.greeting).toBe(expected);
    });
  });
});
