import { ComponentFixture, TestBed } from '@angular/core/testing';
import { screen } from '@testing-library/angular';

import { MatchersComponent } from './matchers.component';

describe('MatchersComponent', () => {
  let component: MatchersComponent;
  let fixture: ComponentFixture<MatchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test create component
  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  // Test render texts in component html
  it('Should render component', () => {
    // Act
    const dataCalc = component.calc(2, 2);

    // Assert
    expect(screen.getByText('Page Matchers!')).toBeTruthy();
    expect(screen.getByText(`Test 2 + 2 = ${dataCalc}`)).toBeTruthy();
    expect(screen.getByText(/Test get object name/)).toBeTruthy();
    expect(screen.getByText('Test truthiness null')).toBeTruthy();
    expect(screen.getByText('Test truthiness 0')).toBeTruthy();
    expect(screen.getByText('Test numbers with find a close, exact or equivalent value')).toBeTruthy();
    expect(screen.getByText('Test numbers with find a floating point number equal 0.3')).toBeTruthy();
    expect(screen.getByText('Test string in object name Rodrigo')).toBeTruthy();
    expect(screen.getByText('Test match string in object name Rodrigo with not found "D"')).toBeTruthy();
    expect(screen.getByText('Test match string in object name Rodrigo with find "dri"')).toBeTruthy();
    expect(screen.getByText('Test array string get item milk')).toBeTruthy();
    expect(screen.getByText('Test for exceptions')).toBeTruthy();
  });

  // Exact equality
  it('Should exact equality', () => {
    // Arrange
    const expected = 4;

    // Act
    const data1 = 2 + 2;
    const data2 = component.calc(2, 2);

    // Assert
    expect(data1).toBe(expected);
    expect(data2).toBe(expected);
  });

  // Object Values
  it('Should object values equals', () => {
    // Arrange
    const expected = { name: 'Rodrigo' };

    // Act
    const data1 = { name: 'Rodrigo' };
    const data2 = component.objName;
    const data3 = component.getObject();

    // Assert
    expect(data1).toEqual(expected);
    expect(data2).toEqual(expected);
    expect(data3).toEqual(expected);
  });

  // Truthiness
  it('Should truthiness null', () => {
    // Act
    const data1 = null;
    const data2 = component.getNull();

    // Assert
    expect(data1).toBeNull();
    expect(data1).toBeDefined();
    expect(data1).not.toBeUndefined();
    expect(data1).not.toBeTruthy();
    expect(data1).toBeFalsy();

    expect(data2).toBeNull();
    expect(data2).toBeDefined();
    expect(data2).not.toBeUndefined();
    expect(data2).not.toBeTruthy();
    expect(data2).toBeFalsy();
  });

  it('Should truthiness zero', () => {
    // Act
    const data1 = 0;
    const data2 = component.getZero();

    // Assert
    expect(data1).not.toBeNull();
    expect(data1).toBeDefined();
    expect(data1).not.toBeUndefined();
    expect(data1).not.toBeTruthy();
    expect(data1).toBeFalsy();

    expect(data2).not.toBeNull();
    expect(data2).toBeDefined();
    expect(data2).not.toBeUndefined();
    expect(data2).not.toBeTruthy();
    expect(data2).toBeFalsy();
  });

  // Numbers
  it('Should find a close, exact or equivalent value for two plus two', () => {
    // Arrange
    const expectedGreaterThen = 3;
    const expectedGreaterThenOrEqual = 3.5;
    const expectedExact = 4;
    const expectedLessThenOrEqual = 4;
    const expectedLessThen = 5;

    // Act
    const data = 2 + 2;

    // Assert
    // find a close
    expect(data).toBeGreaterThan(expectedGreaterThen);
    expect(data).toBeGreaterThanOrEqual(expectedGreaterThenOrEqual);
    expect(data).toBeLessThan(expectedLessThen);
    expect(data).toBeLessThanOrEqual(expectedLessThenOrEqual);

    // toBe and toEqual are equivalent for numbers
    expect(data).toBe(expectedExact);
    expect(data).toEqual(expectedExact);
  });

  it('Should find a floating point number', () => {
    // Arrange
    const expected = 0.3;

    // Act
    const data1 = 0.1 + 0.2;
    const data2 = component.getFloatNumber();

    // Assert
    // this work, but expect(data).toBe(expected) won´t work because of rouding error
    expect(data1).toBeCloseTo(expected);
    expect(data2).toBeCloseTo(expected);
  });

  // Strings
  it('Should find the string "Rodrigo"', () => {
    // Arrange
    const expected = 'Rodrigo';

    // Act
    const data1 = 'Rodrigo';
    const data2 = component.getObject();

    // Assert
    expect(data1).toBe(expected);
    expect(data1).toEqual(expected);
    expect(data2.name).toBe(expected);
    expect(data2.name).toEqual(expected);
  });

  it('Should find there is no D in "Rodrigo"', () => {
    // Act
    const data1 = 'Rodrigo';
    const data2 = component.getObject();

    // Assert
    expect(data1).not.toMatch(/D/);
    expect(data2.name).not.toMatch(/D/);
  });

  it('Should find there is a "dri" in "Rodrigo"', () => {
    // Act
    const data1 = 'Rodrigo';
    const data2 = component.getObject();

    // Assert
    // this work, but expect(data).toBe(expected) won´t work because of rouding error
    expect(data1).toMatch(/dri/);
    expect(data2.name).toMatch(/dri/);
  });

  // Arrays and iterables
  it('Should find in the list has "milk" on it', () => {
    // Arrange
    const expected = 'milk';

    // Act
    const data1 = ['bread', 'egg', 'milk', 'souce'];
    const data2 = component.arrCondiment;
    const data3 = component.getItemArrCondiment(2);

    // Assert
    expect(data1).toContain(expected);
    expect(new Set(data1)).toContain(expected);

    expect(data2).toContain(expected);
    expect(new Set(data2)).toContain(expected);

    // forstrings, toBe, toEqual and toContein works
    expect(data3).toContain(expected);
  });

  // Exceptions
  it('Should compilation a goes as expected para exception', () => {
    // Arrange
    const expectedError = Error;
    const expectedText = 'You are using old angular version';

    // Act
    const funArrow = () => component.compileExeption();

    // Assert
    expect(funArrow).toThrow();
    expect(funArrow).toThrow(expectedError);

    // use too, the exact error message or a regexp
    expect(funArrow).toThrow(expectedText);
    expect(funArrow).toThrow(/angular/);
  });
});
