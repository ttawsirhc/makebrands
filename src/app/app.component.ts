import { Component, ViewChild } from '@angular/core';  
import { CSVRecord } from './CSVModel'; // import the model 
  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
  
export class AppComponent { 
  title = 'Camping World Demo';
  searchedKeyword: string = ''; // initialize the search functionality string
  public records: any[] = []; // initialize the array for product records

  @ViewChild('csvReader') csvReader: any;
  
  uploadListener($event: any): void { // function to upload CSV and insert results into records array
  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) { // make sure uploaded file ends with .csv
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };  
  
      reader.onerror = function () { // if error occurs, show it in the log
        console.log('error is occured while reading file!');  
      };  
  
    } else { // doesn't end with .csv, notify user
      alert("Please import valid .csv file.");  
      this.fileReset(); // if the file isn't .csv, clear the form element to start over
    } // end if (this.isValidCSVFile(files[0]))
  } // end function uploadListener
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = []; // initialize array for product data records
  
    for (let i = 1; i < csvRecordsArray.length; i++) { // loop through each line 
      let curruntRecord = (<string>csvRecordsArray[i]).split(','); // divide data by commas 
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.camperMake = curruntRecord[0].trim();  
        csvRecord.camperBrand = curruntRecord[1].trim();  
        csvRecord.sleepNumber = curruntRecord[2].trim();  
        csvRecord.price = curruntRecord[3].trim();  
        csvArr.push(csvRecord);  
      } // end if (curruntRecord.length == headerLength)
    }  
    return csvArr; // return array of records
  }  
  
  isValidCSVFile(file: any) {  // determine if selected file ends with .csv
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  // clear upload form to try again
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }

  // sort product records by make
  sortByMakeAsc() { this.records.sort((a, b) => (a.camperMake > b.camperMake) ? 1 : -1); }
  sortByMakeDesc() { this.records.sort((a, b) => (a.camperMake < b.camperMake) ? 1 : -1); }

  // sort product records by brand
  sortByBrandAsc() { this.records.sort((a, b) => (a.camperBrand > b.camperBrand) ? 1 : -1); }
  sortByBrandDesc() { this.records.sort((a, b) => (a.camperBrand < b.camperBrand) ? 1 : -1); }

  sortBySleepNumberAsc() { // sort product records in ascending order by sleep number
    let tempNumsArr = []; // initialize temporary array for sorted sleep numbers in array 
    let tempStrArr = []; // initialize temporary array for "n/a"
    let combinedArr = []; // initialize array to put "n/a" after sorted sleep numbers

    for (let i = 0; i < this.records.length; i++) { // loop through to 
      if (!isNaN(this.records[i].sleepNumber)){ // identify all numbers in the array
        tempNumsArr.push(this.records[i]); // if a number, push to the numbers array
      } else { // it's not a number but a string, so ...
        tempStrArr.push(this.records[i]); // push any strings/non-numbers to the strings array
      } // end if (!isNaN(this.records[i].sleepNumber))
    } // end for (let i = 0; i < this.records.length; i++)

    // sort the numbers in the numbers array AS numbers
    tempNumsArr.sort((a, b) => (parseInt(a.sleepNumber) > parseInt(b.sleepNumber)) ? 1 : -1);
    combinedArr = tempNumsArr.concat(tempStrArr); // concatenate the strings to the numbers array
    this.records = combinedArr; // update the records array to be the combined array

  } // end function sortBySleepNumberAsc

  sortBySleepNumberDesc() { // sort product records in descending order by sleep number
    let tempNumsArr = [];
    let tempStrArr = [];
    let combinedArr = [];

    for (let i = 0; i < this.records.length; i++) {
      if (!isNaN(this.records[i].sleepNumber)){ 
        tempNumsArr.push(this.records[i]);
      } else {
        tempStrArr.push(this.records[i]);  
      } // end if (!isNaN(this.records[i].sleepNumber))
    } // end for (let i = 0; i < this.records.length; i++)

    tempNumsArr.sort((a, b) => (parseInt(a.sleepNumber) < parseInt(b.sleepNumber)) ? 1 : -1);
    combinedArr = tempNumsArr.concat(tempStrArr);
    this.records = combinedArr;
  } // end function sortBySleepNumberDesc

  sortByPriceAsc() { // sort product records in ascending order by price
    let tempNumsArr = [];
    let tempStrArr = [];
    let combinedArr = [];

    for (let i = 0; i < this.records.length; i++) {
      if (!isNaN(this.records[i].price)){ 
        tempNumsArr.push(this.records[i]);
      } else {
        tempStrArr.push(this.records[i]);  
      } // end if (!isNaN(this.records[i].price))
    } // end for (let i = 0; i < this.records.length; i++)

    tempNumsArr.sort((a, b) => (parseInt(a.price) > parseInt(b.price)) ? 1 : -1);
    combinedArr = tempNumsArr.concat(tempStrArr);
    this.records = combinedArr;
  } // end function sortByPriceAsc

  sortByPriceDesc() { // sort product records in descending order by price
    let tempNumsArr = [];
    let tempStrArr = [];
    let combinedArr = [];

    for (let i = 0; i < this.records.length; i++) {
      if (!isNaN(this.records[i].price)){ 
        tempNumsArr.push(this.records[i]);
      } else {
        tempStrArr.push(this.records[i]);  
      } // end if (!isNaN(this.records[i].price))
    } // end for (let i = 0; i < this.records.length; i++)

    tempNumsArr.sort((a, b) => (parseInt(a.price) < parseInt(b.price)) ? 1 : -1);
    combinedArr = tempNumsArr.concat(tempStrArr);
    this.records = combinedArr;
  } // end function sortByPriceDesc
} // end class AppComponent  