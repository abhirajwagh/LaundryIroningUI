export class Header {
    public isCheckbox?: boolean;
    public name: string;
    public fieldName: string;
    public headercss: string;
    public dataType: string;
    public icon: string;
    public navigation?: string;
    public isEnabled = true;

}

export class MyData {
    public allcheck: boolean;
    public column: string;
    public rowData: any;
    public minOneSelected: boolean;
}

export class PageData {
    public PageSize: number;
    public CurrentPage: number;
    public TotalPage: number;
    public TotalItems: number;
}

export class FilterColumnModel {
    public ColumnName: string;
    public FilterArray: FilterModel[];
  }
export class FilterModel {
    public FilterString: string;
    public IsChecked: boolean;
    public IsDisplay: string;
  }
