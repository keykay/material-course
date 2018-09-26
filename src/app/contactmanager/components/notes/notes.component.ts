import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, SimpleChange, AfterViewInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, delay, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() notes: Note[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'title', 'date'];
  dataSource: MatTableDataSource<Note>;
  filter$: Subject<string> = new Subject<string>();
  executingSearch$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Note>(this.notes);
    this.dataSource.paginator = this.paginator;

    this.filter$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x => of(x)),
      tap(val => this.executingSearch$.next(true)),
      concatMap(val => of(val).pipe(delay(300)))
    ).subscribe(
      next => {
        this.dataSource.filter = next.trim().toLowerCase();
        this.executingSearch$.next(false);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const newNotes: Note[] = changes.notes.currentValue || [];
    this.dataSource = new MatTableDataSource<Note>([...newNotes]);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
