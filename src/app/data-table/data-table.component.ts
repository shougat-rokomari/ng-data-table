import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../domain/user';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() url: string;
  @Input() pageSize: number;
  pages: number[] = [];
  lastPage: number;
  currentPage = 1;
  users: User[];
  loading = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    setTimeout(() => {
      this.http
        .get<User[]>(this.url + '?page=' + this.currentPage + '&size=' + this.pageSize, {observe: 'response'})
        .subscribe(response => {
          this.users = response.body;
          this.lastPage = Math.ceil(parseInt(response.headers.get('total-items'), 10) / this.pageSize);
          for (let i = 1; i <= this.lastPage; i++) {
            this.pages.push(i);
          }
          this.loading = false;
        });
    }, 1000);
  }

  loadNext() {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  loadPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }

  loadPage(page: number) {
    this.http.get<User[]>(this.url + '?page=' + page + '&size=' + this.pageSize).subscribe(data => {
      this.users = data;
      this.currentPage = page;
    });
  }
}
