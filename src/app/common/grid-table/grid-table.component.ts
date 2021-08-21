import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges } from '@angular/core'
import { Header, PageData, MyData } from './grid-table.model';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/Services/Common.service';
import { environment } from 'src/environments/environment';
import { SearchDataService } from 'src/app/Services/Search-data-service.service';
import { DatePipe } from '@angular/common';



@Component({
    selector: 'app-grid-table',
    templateUrl: './grid-table.component.html',
    styleUrls: ['./grid-table.component.css']
})
export class GridTableComponent implements OnInit, OnChanges {

    private _data: any[];
    tableData: any[] = [];
    filterData: any[];
    serachData: any[];
    checkAll: any;
    isData: boolean;
    isCSVFileIcon = false;
    csvText: string;
    isSelectedPage = false;
    selectedPage: number;
    tableDataAfterSelectetion: any[] = [];
    currentpageAfterSelection: number;
    @Input() pagesize = 50;
    @Input() columns: Header[];
    @Input() CSVFileTitle = '';
    @Input() equipConfigPopup: boolean;
    @Input()
    set Data(Data: any[]) {
        this.tableDataAfterSelectetion = this.tableData;
        this.currentpageAfterSelection = this.currentPage;
        if (Data !== undefined && Data !== null && Data.length >= 0) {
            this.filterData = Data;
            this.serachData = Data;
            this.tableData = Data && Data.slice(0, this.pagesize);
            if (Data.length === 0) {
                this.isData = false;
            } else if (Data.length > 0) {
                this.isData = true;
            }
            this.TotalItem = Data.length;
        } else {
            this.filterData = [];
            this.serachData = [];
            this.tableData = [];
        }
        if (this.checkbox) {
            this.checkbox.nativeElement.indeterminate = false;
        }
        this.checkAll = false;
        this.currentPage = 1;
    }

    get Data(): any[] {
        return this._data;
    }


    @Input()
    set interFalse(Data: boolean) {
        if (this.checkbox !== undefined) {
            if (Data === true) {
                this.checkbox.nativeElement.indeterminate = false;
                this.checkAll = false;
            }
        }
    }

    get interFalse(): boolean {
        return this.checkbox.nativeElement.indeterminate;
    }

    @Input() ShowTooTip = false;
    @Input() checkedKey: string;
    @Input() showselection = false;
    @Input() enablerowselection = true;
    @Input() showpagesize = true;
    @Input() enableSorting = true;
    @Input() enableSearch = false;
    @Input() pagination = false;
    @Input() server = false;
    @Input() uniqueKey: string;
    @Input() TotalItem: number;
    @Input() rowIndexFromPopup: number;
    @Output() clickedIcon = new EventEmitter<object>();
    @Output() selectedIndex = new EventEmitter<number>();
    @Output() pageChangedData = new EventEmitter<PageData>();
    @Output() pageContent = new EventEmitter<any>();
    @Output() AllCheckedClicked = new EventEmitter<object>();
    @Input() format = 'medium';
    @Input() showfooter = false;
    @Input() isSearchText = true;
    @Input() tbodyHeight: string;
    @Input() noDataHeight: string;
    @Input() GridName: any = null;
    @ViewChild('theCheckbox', { static: false }) checkbox;
    selectedRow: MyData;
    pageData: PageData;
    direction = true;
    currentClasses: {};
    sortcolumn: string;
    currentPage = 1;
    totalPage: number;
    math: any;
    highlightedRow: number;
    searchText: string;
    defaultSortColumn = 0;
    min = 1;
    max: number;
    firstCheckBox: boolean;
    multiSelectRow = [];
    selectionArray = [];
    isPublish = false;
    csvOptions: any;
    @Output() PointListIcon = new EventEmitter<object>();
    @Output() isEditBtnClicked = new EventEmitter<boolean>();
    constructor(private translateService: TranslateService, private searchService: SearchDataService
        ,       private commonService: CommonService, public datePipe: DatePipe) {
        translateService.setDefaultLang(environment.DefaultLanguage);
        this.math = Math;
    }
    ngOnInit() {
        if (this.Data) {
            this._data = this.Data;
            this.filterData = this.Data;
            this.tableData = this.Data && this.Data.slice(0, this.pagesize);
            this.pageContent.emit(this.tableData);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (this.CSVFileTitle === 'devicesList') {
            this.isCSVFileIcon = true;
        } else {
            this.isCSVFileIcon = false;
        }
    }

    selectAllCheckbox() {
        const NonPulishedData = [];
        const totalLength = this.tableData.length;
        this.tableData.forEach(i => {
            if (i.componentName === 'Create Equipment') {
                if (this.checkAll === true && i.IsImported === false) {
                    i.isChecked = true;
                    NonPulishedData.push(i);
                } else {
                    i.isChecked = false;
                }
            } else {
                if (this.checkAll === true) {
                    i.isChecked = true;
                    NonPulishedData.push(i);
                } else {
                    i.isChecked = false;
                }
            }
        });
        if (this.checkAll === true) {
            if (NonPulishedData.length > 0) {
                this.selectedRow =
                    { allcheck: true, column: 'Selected', rowData: NonPulishedData, minOneSelected: true };
            } else {
                this.selectedRow =
                    { allcheck: true, column: 'Selected', rowData: NonPulishedData, minOneSelected: false };
            }
            this.clickedIcon.emit(this.selectedRow);
            this.isEditBtnClicked.emit(false);
            this.AllCheckedClicked.emit(this.selectedRow);
        } else {
            this.selectedRow = { allcheck: false, column: 'AllUnselected', rowData: this.tableData, minOneSelected: false };
            this.clickedIcon.emit(this.selectedRow);
            this.isEditBtnClicked.emit(false);
            this.AllCheckedClicked.emit(this.selectedRow);
        }
    }

    setCurrentClasses(column1: string) {
        this.max = this.TotalItem !== undefined && this.TotalItem !== 0 ? this.math.ceil(this.TotalItem / this.pagesize) : 1;
        return {
            'fa': true,
            'fa-sort-asc': (this.direction && column1 === this.sortcolumn) ||
                (!this.direction && column1 !== this.sortcolumn) || this.sortcolumn === undefined,
            'fa-sort-desc': (!this.direction && column1 === this.sortcolumn) || (this.direction && column1 != this.sortcolumn)
        };
    }

    sort(field: string, columnType: string) {
        if (!this.enableSorting) { return; }
        if (this.sortcolumn === undefined || this.sortcolumn === field) {
            this.direction = !this.direction;
        } else {
            this.direction = true;
        }
        this.sortcolumn = field;

        this.setCurrentClasses(this.sortcolumn);
        if (columnType === 'number') {
            if (this.direction) {
                this.filterData = this.filterData.sort((a, b) => {
                    if (a[field] === null && b[field] === null) { return 0; }
                    if (a[field] === null) { return -1; }
                    if (b[field] === null) { return 1; }
                    let p;
                    let q;
                    if (typeof a[field] === 'number') {
                        p = a[field];
                        q = b[field];
                    } else {
                        p = parseFloat(a[field].replace(/,/g, ''));
                        q = parseFloat(b[field].replace(/,/g, ''));
                    }
                    return p - q;
                });
            } else {
                this.filterData = this.filterData.sort((a, b) => {
                    if (a[field] === null && b[field] === null) { return 0; }
                    if (a[field] === null) { return 1; }
                    if (b[field] === null) { return -1; }
                    let p;
                    let q;
                    if (typeof a[field] === 'number') {
                        p = a[field];
                        q = b[field];
                    } else {
                        p = parseFloat(a[field].replace(/,/g, ''));
                        q = parseFloat(b[field].replace(/,/g, ''));
                    }
                    return q - p;
                });
            }
        } else if (columnType === 'date' || columnType === 'dateString') {
            if (this.direction) {
                this.filterData = this.filterData.sort(function (a, b) {
                    const aDate = (new Date(a[field]));
                    const bDate = (new Date(b[field]));
                    return aDate > bDate ? 1 : -1;
                });
            } else {
                this.filterData = this.filterData.sort(function (a, b) {
                    const aDate = (new Date(a[field]));
                    const bDate = (new Date(b[field]));
                    return aDate < bDate ? 1 : -1;
                });
            }
        } else {
            if (this.direction) {
                this.filterData = this.filterData.sort((a, b) => {
                    if (a[field] !== null && a[field] !== undefined && a[field] !== '') {
                        return a[field].localeCompare(b[field]);
                    } else {
                        return a[field];
                    }
                });
            } else {
                this.filterData = this.filterData.sort((a, b) => {
                    if (b[field] !== null && b[field] !== undefined && b[field] !== '') {
                        return b[field].localeCompare(a[field]);
                    } else {
                        return b[field];
                    }
                });
            }
        }
        this.emitPageData();
    }

    emitPageData() {
        this.highlightedRow = -1;
        // this.selectedRow = { Id: '', column: '', rowData: null, minOneSelected: false };
        // this.clickedIcon.emit(this.selectedRow);

        this.pageData = {
            PageSize: this.pagesize,
            CurrentPage: this.currentPage,
            TotalPage: this.math.ceil(this.TotalItem / this.pagesize),
            TotalItems: this.TotalItem
        };

        if (this.server) {
            this.pageChangedData.emit(this.pageData);
        } else {
            const startIndex = (this.currentPage - 1) * this.pagesize;
            const endIndex = this.currentPage * this.pagesize;
            if (this.filterData && this.filterData.length > 0) {
                this.tableData = this.filterData.slice(startIndex, endIndex);
            } else {
                this.tableData = this._data.slice(startIndex, endIndex);
            }
            this.pageContent.emit(this.tableData);
        }
    }

    pageSizeChanged() {
        this.currentPage = 1;
        this.emitPageData();
    }

    previousPage() {
        if (this.currentPage === 1) { return; }
        this.currentPage--;
        this.emitPageData();
        this.getCurrentPageData();

    }

    nextPage() {
        this.totalPage = this.math.ceil(this.TotalItem / this.pagesize);
        if ((this.currentPage === this.totalPage) || (this.totalPage == 0)) { return; }
        this.currentPage++;
        this.emitPageData();
        this.getCurrentPageData();

    }

    getCurrentPageData() {
        let counttrue = 0;
        let countfalse = 0;
        let temp = [];
        temp = this.tableData;
        temp.forEach(i => {
            if (i.isChecked === true) {
                counttrue++;
            } else {
                countfalse++;
            }
        });
        if (this.showselection) {
            if (counttrue !== 0 && counttrue < temp.length) {
                this.checkAll = false;
                this.checkbox.nativeElement.indeterminate = true;
            } else {
                if (counttrue === temp.length && counttrue !== 0) {
                    this.checkAll = true;
                    this.checkbox.nativeElement.indeterminate = false;
                } else {
                    this.checkAll = false;
                    this.checkbox.nativeElement.indeterminate = false;
                }
                if (countfalse === temp.length) {
                    this.checkAll = false;
                    this.checkbox.nativeElement.indeterminate = false;
                }
            }
        }
        return counttrue;
    }

    lastPage() {
        this.currentPage = this.math.ceil(this.TotalItem / this.pagesize);
        this.emitPageData();
    }
    setClickedRow(index: number, key: string, rowData: any, colName: any) {

        this.tableData.forEach(i => {
            if (i.selectedValue === 'true') {
                i.selectedValue = '';
            }
        });
        if (!this.enablerowselection) { return true; }
        if ((!rowData.componentName) || (rowData.componentName === 'Create Equipment')) {
            this.highlightedRow = index;
            this.selectedPage = this.currentPage;
            this.isSelectedPage = true;
        }
        this.selectedRow = rowData;
        this.selectedIndex.emit(this.highlightedRow);
        this.clickedIcon.emit(this.selectedRow);
        this.isEditBtnClicked.emit(false);
    }

    onChecked(event: any, rowData: any) {

        let atlestOneSelected;
        const counttrue = this.getCurrentPageData();
        if (counttrue > 0) {
            atlestOneSelected = true;
        }
        if (event.target.checked) {
            // this.multiSelectRow.push(rowData);
            rowData.isChecked = true;
            this.selectedRow = { allcheck: false, column: 'Selected', rowData: rowData, minOneSelected: atlestOneSelected };
        } else {
            this.selectedRow = { allcheck: false, column: 'Unselected', rowData: rowData, minOneSelected: atlestOneSelected };
            // this.checkbox.nativeElement.indeterminate = true;
        }
        this.isEditBtnClicked.emit(false);
        this.clickedIcon.emit(this.selectedRow);
    }



    go() {
        if (this.currentPage) {
            this.totalPage = this.math.ceil(this.TotalItem / this.pagesize);
            if (this.currentPage > this.totalPage || this.currentPage <= 0) { return; }
            this.emitPageData();
        }
    }

    Update() {
        this.selectAllCheckbox();
    }


    onKey() {
        if ((this.searchText.toLowerCase().indexOf('*') !== -1 || this.searchText.toLowerCase().indexOf('?') !== -1)
            && this.searchText.toLowerCase().length > 1) {
            this.filterData = this.searchService.SearchByRegex(this.searchText.toLowerCase(), this.serachData, this.columns);
        } else {
            this.filterData = this.serachData.filter(it => {
                delete it.url;
                let columnName = '';
                for (let index = 0; index < this.columns.length; index++) {
                    columnName = this.columns[index].fieldName;
                    if (this.columns[index].dataType === 'date') {
                        it[columnName] = this.datePipe.transform(new Date(it[columnName]), 'MMM d, y, h:mm:ss a');
                      }
                    if (it[columnName] !== '' && it[columnName] !== undefined && it[columnName] !== null) {
                        if (it[columnName].toString().toLowerCase().indexOf(this.searchText.toLowerCase()) >= 0) {
                            return it;
                        }
                    }
                }
            });
        }
        this.tableData = this.filterData.slice(0, this.pagesize);
        this.TotalItem = this.filterData.length;
        this.currentPage = 1;
    }

    OnAnyActionComplete() {
        this.searchText = null;
    }

 
    downloadCSV() {

        let obj: any, devideHeaderName;
        const columnHeader = [];
        const columnData = [];
        if (this.CSVFileTitle === 'devicesList' || this.CSVFileTitle === 'Equipment-PointData' || this.CSVFileTitle === 'equipmentPointsGroupData') {
            this.columns.forEach(i => {
                columnHeader.push(i.name);
            });

        }
        if (this.CSVFileTitle === 'devicesList') {
                this.filterData.forEach(i => {
                    obj = {
                        'Name': i.Device, 'Native reference': i.Device, 'Data collector': i.DataCollector,
                        'DataSource': i.DataSource, 'Unconfigured point count': i.UnconfiguredPointCount, 'Configured point count': i.ConfiguredPointCount,
                        'Mapped point count': i.MappedPointCount
                    };
                    columnData.push(obj);
                });
            }

        this.csvOptions = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: false,
            title: this.CSVFileTitle,
            headers: columnHeader
        };
        let a = new AngularCsv(columnData, this.commonService.getExcelFileNameWithDateTime(this.CSVFileTitle, '.csv'), this.csvOptions);

    }

    PointListIconClicked(rowData: any, column: any) {

        this.selectedRow = { allcheck: false, column: column, rowData: rowData, minOneSelected: false };
        this.PointListIcon.emit(this.selectedRow);
        this.isEditBtnClicked.emit(true);
    }
}
