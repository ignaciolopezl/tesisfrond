import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IDiario } from 'types/diario';
import { DiarioService } from './../../../services/diario/diario.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit ,AfterViewInit {

  constructor(private diariosServices : DiarioService) {
    this.getDiarios()
  }
  diarios : IDiario[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  DiarioDataSource = new MatTableDataSource;
  displayedColumns: string[] = ['Descripción', 'Edición'];

  ngOnInit(): void {

  }

  editarDiario(){
    console.log("editar")

  }

  ngAfterViewInit() {
    this.DiarioDataSource.sort = this.sort;
    this.DiarioDataSource.paginator = this.paginator;
  }

  async getDiarios(){
    await this.diariosServices.getAllDiarios().subscribe(data => {
      console.log(data)
      this.DiarioDataSource.data = data
    })
  }
}
