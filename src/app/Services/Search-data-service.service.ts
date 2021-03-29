
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchDataService {

  constructor() { }

  // serach the data by start with and end with given input
  SearchByRegex(searchText, data, columns): any {
    let filterdata = [];
    let regex: any;
    let isSearchByQusetion = false;
    if (searchText.toLowerCase().includes('*') && !searchText.toLowerCase().includes('?')) {
      regex = this.CreateRegexUsingOnlyStar(searchText);
    } else if (searchText.toLowerCase().includes('?') && !searchText.toLowerCase().includes('*')) {
      isSearchByQusetion = true;
      regex = this.CreateRegexUsingOnlyQuestionMark(searchText);
    } else {
      regex = this.CreateRegexUsingBothStarAndQuestionMark(searchText);
    }
    filterdata = data.filter(it => {
      delete it.url;
      let columnName = '';
      for (let index = 0; index < columns.length; index++) {
        columnName = columns[index].fieldName;
        if (it[columnName] !== '' && it[columnName] !== undefined && it[columnName] !== null) {
          if (isSearchByQusetion) {
            if (regex.test(it[columnName].toString().toLowerCase()) && searchText.length === it[columnName].toString().length) {
              return it;
            }
          } else {
            if (regex.test(it[columnName].toString().toLowerCase())) {
              return it;
            }
          }
        }
      }
    });
    return filterdata;
  }


  // create a regex for string having only star
  private CreateRegexUsingOnlyStar(searchText: any) {
    let regex: any;
    const lengthOfStar = searchText.toLowerCase().split('*');
    const lengthoftext = searchText.toLowerCase().length;
    if (lengthOfStar.length === 2) { // i.e string contain only one star.(*Ahu)
      if (searchText.toLowerCase().indexOf('*') === 0) {
        regex = new RegExp(lengthOfStar[1].toLowerCase() + '$');
      } else if (searchText.toLowerCase().indexOf('*') === lengthoftext - 1) { // (Ahu*)
        regex = new RegExp('^' + lengthOfStar[0].toLowerCase());
      } else { // (Ahu*Vav)
        regex = new RegExp('^' + lengthOfStar[0].toLowerCase() + '.*' + lengthOfStar[1].toLowerCase() + '$');
      }
    } else if (lengthOfStar.length > 2) {
      let text: any;
      for (let index = 0; index < lengthOfStar.length - 1; index++) {
        text = searchText.toLowerCase().replace('*', '^');
        searchText = text;
      }
      for (let index = 0; index < lengthOfStar.length - 1; index++) {
        text = searchText.toLowerCase().replace('^', '.*');
        searchText = text;
      }
      regex = new RegExp(text);
    }
    return regex;
  }

  // create a regex for string having only question mark
  private CreateRegexUsingOnlyQuestionMark(searchText: any): any {
    let regex: any;
    const lengthOfquestion = searchText.toLowerCase().split('?');
    const lengthoftext = searchText.toLowerCase().length;
    let text: any;
    for (let index = 0; index < lengthOfquestion.length - 1; index++) {
      text = searchText.toLowerCase().replace('?', '.');
      searchText = text;
    }
      regex = new RegExp(text);
      return regex;
  }


  // method to create a regex for combination of star and question mark.
  CreateRegexUsingBothStarAndQuestionMark(searchText: any): any {
    let regex: any;
    const lengthOfquestion = searchText.toLowerCase().split('?');
    const lengthOfstar = searchText.toLowerCase().split('*');
    const lengthoftext = searchText.toLowerCase().length;
    let text: any;
    for (let index = 0; index < lengthOfquestion.length - 1; index++) {
      text = searchText.toLowerCase().replace('?', '.');
      searchText = text;
    }
    for (let index = 0; index < lengthOfstar.length - 1; index++) {
      text = text.toLowerCase().replace('*', '.*');
      searchText = text;
    }
    regex = new RegExp(text);
    return regex;
  }
}
