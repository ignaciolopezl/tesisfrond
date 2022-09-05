import { FlatTreeControl } from '@angular/cdk/tree';
import {
  Component,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
declare const saveDocument: any;
declare const loadDocument: any;

export interface Marca {
  IdMarca?: number;
  Contenido?: string;
  NombreMarca?: string;
}
export interface Marcas {
  Marcas?: Marca[];
}
export interface Diario {
  IdDiario?: number;
  Descripcion?: string;
  Marcas?: Marcas;
}
export interface Diarios{
  diario?: Diario;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

var TREE_DATA: FoodNode[] = [];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  //-----------------------variables de utlidad----------------------
  legislatura = "Legislatura 370°"
    marcaActual="";
    NumeroDiarios = 1;
    marcas : Marcas = {
      Marcas: []
    };
    diario : Diario = {
      IdDiario: 1,
      Descripcion: "Diario de Sesiones del Senado - Legislatura 370"
    }
    Objetodiarios : Diario[] = [{IdDiario: 2,Descripcion: "Diario de Sesiones del Senado - Legislatura 355",Marcas:{}}];

  //---------------------------------------------
  title = 'tesis';
  mivar = '';

  //---------------Tablas desde aqui-------------------------------------------------------------------------------------

  displayedColumns: string[] = ['Descripcion','IdDiario'];
  dataSource1 = new MatTableDataSource<Diario>(this.Objetodiarios);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
  }

  //--------------------trablas hasta aqui---------------------------------------------------------------------------

  //-----------------treee desde aqui-------------------------------------------------------------------------------

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private _snackBar: MatSnackBar) {
    this.loadDataTree();
  }
  loadDataTree() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  //---------------------tree hasta aqui------------------------------------------------------------------------------------

  //--------------------textControl desde aqui-------------------------------------------------------------------------------

  onClickSave() {
    saveDocument((valorsito: string) => {
      this.mivar = valorsito;
      console.log(this.mivar);
    });
  }

  onClickLoad() {
    let vara = `<body style="font-family:'Arial';font-size:12pt;text-align:left;">
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:10pt;">YO SOY EL MISMO </span><span style="font-family:'Calibri Light';font-size:10pt;">asi Es lo mismo</span></p>
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;font-family:'Comic Sans MS';font-size:10pt;">DE SIEMPRE E</p>
    </body>`;
    loadDocument(vara);
  }

  //-----------------------textcontrol hasta aqui-----------------------------------------------

  //-------------------------FUNCIONALIDADES DESDE AQUI---------------------------

  LoadMarcas() {
    console.log('se cargaron las marcas');
    TREE_DATA = [
      {
        name: 'Legislatura 370°',
        children: [
          {
            name: 'Asistencia',
          },
          {
            name: 'Apertura de Sesión',
          },
          {
            name: 'Tramitación de Actas',
          },
          {
            name: 'Cuenta',
          },
          {
            name: 'Fácil de Despacho',
            children: [
              {
                name: 'CONDONACIÓN DE INTERESES MORATORIOS DE CRÉDITOS PIGNORATICIOS DEVENGADOS DURANTE PERÍODO DE PANDEMIA DE COVID-19',
              },
              { name: 'Relación' },
              { name: 'Resolución' },
              {
                name: 'Oradores',
                children: [
                  { name: 'Carvajal Ambiado, Loreto' },
                  { name: 'Cruz-Coke Carvallo, Luciano' },
                  { name: 'Kast Sommerhoff, Felipe' },
                  { name: 'Kuschel Silva, Carlos Ignacio' },
                  { name: 'Moreira Barros, Iván' },
                  { name: 'Pugh Olavarría, Kenneth' },
                  { name: 'Saavedra Chandía, Gastón' },
                  { name: 'Sanhueza Dueñas, Gustavo' },
                ],
              },
            ],
          },
        ],
      },
    ];
    this.loadDataTree();
  }

  public setMarca(nombreMarca: string) {
    this.openConfimationDialog3(nombreMarca)
    this.marcaActual = nombreMarca;
    console.log("entro")
    if( this.marcas.Marcas?.length==0){
      this.marcas.Marcas?.push({NombreMarca:nombreMarca})
    }else{
      let estaDentro=false;
      this.marcas.Marcas?.forEach(marca => {
        if(marca.NombreMarca == nombreMarca){
          estaDentro=true
          if(marca.Contenido){
            console.log("llegue aca")

            loadDocument(marca.Contenido);
          }else{
            loadDocument("");
          }
        }
      });
      if(estaDentro ==false){
        this.marcas.Marcas?.push({NombreMarca:nombreMarca})
        loadDocument("");
      }
    }
    console.log(this.marcas.Marcas)
  }
  public saveMarca(){
    this.openConfimationDialog()
    this.marcas.Marcas?.forEach(marca => {
      if(marca.NombreMarca == this.marcaActual){
        saveDocument((contenidoBody: string) => {
          marca.Contenido = contenidoBody;
          console.log(contenidoBody)
        });
      }
    });
  }
  public saveDiario(){
    this.diario.Marcas = this.marcas;
    if(this.Objetodiarios.length == 0){
      this.Objetodiarios.push(this.diario)
    }else{
      this.Objetodiarios.push(this.diario)
    }
/*     this.Objetodiarios.diarios?.forEach(diario => {

    }); */
    console.log(this.Objetodiarios)
    this.openConfimationDialog2()
  }

  openConfimationDialog(){
    this._snackBar.open("La Marca se guardo Correctamente",'', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackBar'],
    });
  }
  openConfimationDialog2(){
    this._snackBar.open("El diario se guardo Correctamente",'', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['snackBar'],
    });
  }
  openConfimationDialog3(marca : string){
    this._snackBar.open(`se cambio de marca a ${marca} `,'', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBar'],
    });
  }
  openConfimationDialog4(){
    this._snackBar.open("El diario se cargo Correctamente",'', {
      duration: 2 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackBar'],
    });
  }
  editarDiario(){
    this.openConfimationDialog4()
    loadDocument("");
    this.marcas.Marcas = [{Contenido: 'Astencia de 355',NombreMarca : "Asistencia"},{Contenido: 'Apertura de 355',NombreMarca : "Apertura de Sesión"},{Contenido: 'Tramitacion de 355',NombreMarca : "Tramitación de Actas"},{Contenido: 'Cuenta 355',NombreMarca : "Cuenta"}]
    this.legislatura = "Legislatura 355°"
    TREE_DATA = [
      {
        name: 'Legislatura 355°',
        children: [
          {
            name: 'Asistencia',
          },
          {
            name: 'Apertura de Sesión',
          },
          {
            name: 'Tramitación de Actas',
          },
          {
            name: 'Cuenta',
          },
        ],
      },
    ];
    this.loadDataTree();
  }
}


