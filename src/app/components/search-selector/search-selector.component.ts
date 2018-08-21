import { Component, OnInit,Input,Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-selector',
  templateUrl: './search-selector.component.html',
  styles: [
    `.dropbtn {
      background-color: #4CAF50;
      color: white;
      padding: 16px;
      font-size: 16px;
      border: none;
      cursor: pointer;
  }
  
  .dropbtn:hover, .dropbtn:focus {
      background-color: #3e8e41;
  }
  
  #searchFilter {
      border-box: box-sizing;      
      background-position: 14px 12px;
      background-repeat: no-repeat;
      font-size: 16px;
      padding: 14px 20px 12px 45px;
      border: none;
      border-bottom: 1px solid #ddd;
  }
  
  #searchFilter:focus {outline: 3px solid #ddd;}
  
  .dropdown {
      position: relative;
      display: inline-block;
  }
  
  .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f6f6f6;
      min-width: 230px;
      overflow: auto;
      border: 1px solid #ddd;
      z-index: 1;
  }
  
  .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
  }
  
  .dropdown a:hover {background-color: #ddd;}
  
  .show {display: block;}`
  ]
})
export class SearchSelectorComponent implements OnInit { 

  @Input('elementsdata') elementsData:any[] = [];
  @Output() selectedUser: EventEmitter<any>= new EventEmitter();
  
  selectedElement:any={};
  constructor() { }

  ngOnInit() {
  }

  selectUser(element:any){
    this.selectedUser.emit(element);
    this.selectedElement=element;
    //document.getElementById("selectFilter").classList.toggle("hide");
    this.showDropdown();
  }

  showDropdown(){
    document.getElementById("selectFilter").classList.toggle("show");
  }

  filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("searchFilter");
    filter = input.value.toUpperCase();
    var div = document.getElementById("selectFilter");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

resetSelection(){
    this.selectedElement={};
}

}
