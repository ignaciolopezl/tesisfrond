import { Component, OnInit } from '@angular/core';
import { IDiario } from 'types/diario';
import { DiarioService } from '../services/diario/diario.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  diarios : IDiario[];
  constructor(private diariosServices : DiarioService) { }

  ngOnInit(): void {
    this.diariosServices.getAllDiarios().subscribe(data => {
      this.diarios = data
    })

  }

  crear(){
    this.diariosServices.postDiario().subscribe(data =>{
      console.log(data)
    })
  }
  modificar(){
    this.diariosServices.updateDiario().subscribe(data =>{
      console.log(data)
    })
  }
  eliminar(){
    this.diariosServices.deleteDiario().subscribe(data =>{
      console.log(data)
    })
  }


}
