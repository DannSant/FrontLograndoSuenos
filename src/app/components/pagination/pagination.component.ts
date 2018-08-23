import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  fromPag:number=0;
  pages:number[]=[];

  @Input('pageSize') pageSize:number;
  @Output() onPageChange:EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
   
  }

  createPaginationArray(records:number){
    for (let i=0;i<(records/this.pageSize);i++){
      this.pages[i] = i;
    }
    this.fromPag=0;

    setTimeout(()=>{
       this.setInitialPage();
     },5000)
    
  }

  setInitialPage(){
    let page=0;
    this.fromPag = page*this.pageSize;
    let pages:NodeListOf<HTMLElement>;
    pages=document.getElementsByName("page");
    Array.from(pages).forEach((page:HTMLElement,index:number)=>{
      page.classList.remove("active");
    });

    let selectedPage = document.getElementById("page" + page);
    if(selectedPage){
      selectedPage.classList.add("active");
    }
  }

  changePage(page:number){
    this.fromPag = page*this.pageSize;
    let pages:NodeListOf<HTMLElement>;
    pages=document.getElementsByName("page");
    Array.from(pages).forEach((page:HTMLElement,index:number)=>{
      page.classList.remove("active");
    });

    let selectedPage = document.getElementById("page" + page);
    if(selectedPage.classList){
      selectedPage.classList.add("active");

      this.onPageChange.emit(this.fromPag);
    }
    
    
  }

  sumPage(value:number){
    let newPage = this.fromPag + value;
    if(newPage<0){
      this.changePage(0);
    }else if(newPage>=this.pages.length){
      this.changePage(this.pages.length-1)
    }else {
      this.changePage(newPage);
    }
  }

}
