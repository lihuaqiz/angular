/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {LOCALE_ID} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {AsyncTestCompleter, afterEach, beforeEach, ddescribe, describe, iit, inject, it, xit} from '@angular/core/testing/testing_internal';
import {expect} from '@angular/platform-browser/testing/matchers';

import {NgLocaleLocalization, NgLocalization, getPluralCategory} from '../src/localization';


export function main() {
  describe('l10n', () => {

    describe('NgLocalization', () => {
      describe('ro', () => {
        beforeEach(() => {
          TestBed.configureTestingModule({
            providers: [{provide: LOCALE_ID, useValue: 'ro'}],
          });
        });

        it('should return plural cases for the provided locale',
           inject([NgLocalization], (l10n: NgLocalization) => {
             expect(l10n.getPluralCategory(0)).toEqual('few');
             expect(l10n.getPluralCategory(1)).toEqual('one');
             expect(l10n.getPluralCategory(1212)).toEqual('few');
             expect(l10n.getPluralCategory(1223)).toEqual('other');
           }));
      });

      describe('sr', () => {
        beforeEach(() => {
          TestBed.configureTestingModule({
            providers: [{provide: LOCALE_ID, useValue: 'sr'}],
          });
        });

        it('should return plural cases for the provided locale',
           inject([NgLocalization], (l10n: NgLocalization) => {
             expect(l10n.getPluralCategory(1)).toEqual('one');
             expect(l10n.getPluralCategory(2.1)).toEqual('one');

             expect(l10n.getPluralCategory(3)).toEqual('few');
             expect(l10n.getPluralCategory(0.2)).toEqual('few');

             expect(l10n.getPluralCategory(2.11)).toEqual('other');
             expect(l10n.getPluralCategory(2.12)).toEqual('other');
           }));
      });
    });

    describe('NgLocaleLocalization', () => {
      it('should return the correct values for the "en" locale', () => {
        const l10n = new NgLocaleLocalization('en_US');

        expect(l10n.getPluralCategory(0)).toEqual('other');
        expect(l10n.getPluralCategory(1)).toEqual('one');
        expect(l10n.getPluralCategory(2)).toEqual('other');
      });

      it('should return the correct values for the "ro" locale', () => {
        const l10n = new NgLocaleLocalization('ro');

        expect(l10n.getPluralCategory(0)).toEqual('few');
        expect(l10n.getPluralCategory(1)).toEqual('one');
        expect(l10n.getPluralCategory(2)).toEqual('few');
        expect(l10n.getPluralCategory(12)).toEqual('few');
        expect(l10n.getPluralCategory(23)).toEqual('other');
        expect(l10n.getPluralCategory(1212)).toEqual('few');
        expect(l10n.getPluralCategory(1223)).toEqual('other');
      });

      it('should return the correct values for the "sr" locale', () => {
        const l10n = new NgLocaleLocalization('sr');

        expect(l10n.getPluralCategory(1)).toEqual('one');
        expect(l10n.getPluralCategory(31)).toEqual('one');
        expect(l10n.getPluralCategory(0.1)).toEqual('one');
        expect(l10n.getPluralCategory(1.1)).toEqual('one');
        expect(l10n.getPluralCategory(2.1)).toEqual('one');

        expect(l10n.getPluralCategory(3)).toEqual('few');
        expect(l10n.getPluralCategory(33)).toEqual('few');
        expect(l10n.getPluralCategory(0.2)).toEqual('few');
        expect(l10n.getPluralCategory(0.3)).toEqual('few');
        expect(l10n.getPluralCategory(0.4)).toEqual('few');
        expect(l10n.getPluralCategory(2.2)).toEqual('few');

        expect(l10n.getPluralCategory(2.11)).toEqual('other');
        expect(l10n.getPluralCategory(2.12)).toEqual('other');
        expect(l10n.getPluralCategory(2.13)).toEqual('other');
        expect(l10n.getPluralCategory(2.14)).toEqual('other');
        expect(l10n.getPluralCategory(2.15)).toEqual('other');

        expect(l10n.getPluralCategory(0)).toEqual('other');
        expect(l10n.getPluralCategory(5)).toEqual('other');
        expect(l10n.getPluralCategory(10)).toEqual('other');
        expect(l10n.getPluralCategory(35)).toEqual('other');
        expect(l10n.getPluralCategory(37)).toEqual('other');
        expect(l10n.getPluralCategory(40)).toEqual('other');
        expect(l10n.getPluralCategory(0.0)).toEqual('other');
        expect(l10n.getPluralCategory(0.5)).toEqual('other');
        expect(l10n.getPluralCategory(0.6)).toEqual('other');

        expect(l10n.getPluralCategory(2)).toEqual('few');
        expect(l10n.getPluralCategory(2.1)).toEqual('one');
        expect(l10n.getPluralCategory(2.2)).toEqual('few');
        expect(l10n.getPluralCategory(2.3)).toEqual('few');
        expect(l10n.getPluralCategory(2.4)).toEqual('few');
        expect(l10n.getPluralCategory(2.5)).toEqual('other');

        expect(l10n.getPluralCategory(20)).toEqual('other');
        expect(l10n.getPluralCategory(21)).toEqual('one');
        expect(l10n.getPluralCategory(22)).toEqual('few');
        expect(l10n.getPluralCategory(23)).toEqual('few');
        expect(l10n.getPluralCategory(24)).toEqual('few');
        expect(l10n.getPluralCategory(25)).toEqual('other');
      });
    });

    describe('getPluralCategory', () => {
      it('should return plural category', () => {
        const l10n = new FrLocalization();

        expect(getPluralCategory(0, ['one', 'other'], l10n)).toEqual('one');
        expect(getPluralCategory(1, ['one', 'other'], l10n)).toEqual('one');
        expect(getPluralCategory(5, ['one', 'other'], l10n)).toEqual('other');
      });

      it('should return discrete cases', () => {
        const l10n = new FrLocalization();

        expect(getPluralCategory(0, ['one', 'other', '=0'], l10n)).toEqual('=0');
        expect(getPluralCategory(1, ['one', 'other'], l10n)).toEqual('one');
        expect(getPluralCategory(5, ['one', 'other', '=5'], l10n)).toEqual('=5');
        expect(getPluralCategory(6, ['one', 'other', '=5'], l10n)).toEqual('other');
      });
    });
  });
}

class FrLocalization extends NgLocalization {
  getPluralCategory(value: number): string {
    switch (value) {
      case 0:
      case 1:
        return 'one';
      default:
        return 'other';
    }
  }
}