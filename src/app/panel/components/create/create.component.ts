import { Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DtoMarca } from 'types/dto.types/dto.marcas';
import { DtoContenido } from 'types/dto.types/dto.contenido';
import { MarcaService } from 'src/app/services/marca/marca.service';
import { ContenidoService } from 'src/app/services/contenido/contenido.service';
import { IMarca } from 'types/marca';
import { IContenido } from 'types/contenido';
declare const saveDocument: any;
declare const loadDocument: any;

interface FoodNode {
  name: string;
  id: number;
  children?: FoodNode[];
  state?: boolean;
  contenido?: string;
}

var TREE_DATA: FoodNode[] = [];


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  //------------tree-------------------------
  marcaActual="";
  estado = true;



  ngOnInit(): void {}

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

  constructor(private marcaService: MarcaService, private contenidoService: ContenidoService) {
    this.loadDataTree();
  }
  loadDataTree() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  LoadMarcas() {
    console.log('se cargaron las marcas');
    TREE_DATA = [
      {
        name: 'Legislatura 370°',
        id: 1,
        state: true,
        children: [
          {
            name: 'Asistencia',
            id: 2,
            state: true,
          },
          {
            name: 'Apertura de Sesión',
            id: 3,
            state: false,
          },
          {
            name: 'Tramitación de Actas',
            id: 4,
            state: false,
          },
          {
            name: 'Cuenta',
            id: 5,
            state: false,
          },
          {
            name: 'Fácil de Despacho',
            id: 6,
            state: false,
            children: [
              {
                name: 'CONDONACIÓN DE INTERESES MORATORIOS DE CRÉDITOS PIGNORATICIOS DEVENGADOS DURANTE PERÍODO DE PANDEMIA DE COVID-19',
                id: 7,
                state: false,
              },
              { name: 'Relación', id: 8 ,state: false,},
              { name: 'Resolución', id: 8 ,state: false,},
              {
                name: 'Oradores',
                id: 10,
                state: false,
                children: [
                  { name: 'Cruz-Coke Carvallo, Luciano', id: 11,state: false, },
                  { name: 'Kast Sommerhoff, Felipe', id: 12,state: false, },
                  { name: 'Kuschel Silva, Carlos Ignacio', id: 13,state: false, },
                  { name: 'Moreira Barros, Iván', id: 14,state: false, },
                  { name: 'Pugh Olavarría, Kenneth', id: 15,state: false, },
                  { name: 'Saavedra Chandía, Gastón', id: 16 ,state: false,},
                  { name: 'Sanhueza Dueñas, Gustavo', id: 17,state: false, },
                ],
              },
            ],
          },
        ],
      },
    ];

    if (TREE_DATA) {
      this.loadDataTree();
    }
  }

  GetMarcasHechas() {
    this.postOrder(TREE_DATA[0], -1)
  }

    postOrder(arrayTree : FoodNode , id_padre : number){

    if(arrayTree.children || arrayTree.state === true){

      let marcaPadre : IMarca = { // se crea la marca padre dado que tiene hijos
        HORA_INICIO : "'11-11-2019 13:00:00','dd-mm-yyyy HH24:mi:ss'",
        HORA_FIN :  "'11-11-2019 13:00:00','dd-mm-yyyy HH24:mi:ss'",
        TIPO : arrayTree.name,
        NOMBRE_MARCA : arrayTree.name,
        DESCRIPCION : arrayTree.name,
        ID_ORADOR : 1,
        TIMESTAMP_INICIO : 23,
        TIMESTAMP_FIN : 23,
        ID_DIARIO : 81
      };

        this.marcaService.createMarca(marcaPadre).subscribe(dataMarca=>{ // se manda la marca padre creada y se obtiene todos los datos de esta

        let contenidoDelpadre : IContenido = { // se crea el contenido de la marca padre con la id asociada que se obtuvo de crear la marca
          TIPO : dataMarca.DESCRIPCION,
          CONTENIDO : dataMarca.DESCRIPCION,
          ID_MARCA_ASOCIADA : dataMarca.ID_MARCA,
        }
        if(id_padre && id_padre != -1){ // si la marca padre tiene un padre, se setea el id del padre que se obtiene del bucle
          contenidoDelpadre.CONTENIDO_ID_CONTENIDO = id_padre
        }
        this.contenidoService.createContenido(contenidoDelpadre).subscribe(datacontenidoPadre => { // se manda el contenido asociado a la marca padre
          let contador = arrayTree.children?.length
          contador = contador! - 1
          arrayTree.children?.forEach(SubArrayTree => { // se recorre los hijos del padre


             this.postOrder(SubArrayTree , datacontenidoPadre.ID_CONTENIDO!)
             if(contador==0){
              arrayTree.state = true;
            }
            contador = contador! - 1
          });
        })
        })
    }else{
      let marcaFinal : IMarca = { // se crea la marca hoja/hija
        HORA_INICIO : "'11-11-2019 13:00:00','dd-mm-yyyy HH24:mi:ss'",
        HORA_FIN :  "'11-11-2019 13:00:00','dd-mm-yyyy HH24:mi:ss'",
        TIPO : arrayTree.name,
        NOMBRE_MARCA : arrayTree.name,
        DESCRIPCION : arrayTree.name,
        ID_ORADOR : 1,
        TIMESTAMP_INICIO : 23,
        TIMESTAMP_FIN : 23,
        ID_DIARIO : 81
      };
      this.marcaService.createMarca(marcaFinal).subscribe(dataMarca =>{ // se manda la marca hoja/hija
        let contenidoDelHijo : IContenido = { // se crea el contenido de la hoja/hija
          TIPO : arrayTree.name,
          CONTENIDO : arrayTree.name,
          ID_MARCA_ASOCIADA : dataMarca.ID_MARCA,
          CONTENIDO_ID_CONTENIDO: id_padre

        }
        this.contenidoService.createContenido(contenidoDelHijo).subscribe(datacontenidoPadre => { // se manda el contenido de la hoja/hija
          console.log(datacontenidoPadre)
        })
      })

    }
    return "si"
  }


  //---------------text control controller-----------------



  onClickLoad() {
    let vara = `<body xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Arial';font-size:12pt;text-align:left;">
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;font-size:10pt;">cosas bonitoas cosas preciosas</p>
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;font-size:10pt;"> </p>
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;font-size:10pt;">salto de linea jajaj xd</p>
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;font-size:10pt;"> </p>
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;font-size:10pt;">asdasd</p>
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;font-size:10pt;">asdas</p>
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;font-size:10pt;"> </p>
    <p lang="en-US" style="text-indent:0pt;margin-top:0pt;margin-bottom:0pt;font-size:10pt;">asd</p>

    </body>`;
    loadDocument(vara);
  }

  saveContenido(){
    saveDocument((contenidoBody: string) => {
      this.busquedaTree(this.marcaActual, contenidoBody, TREE_DATA)
    })

  }

  busquedaTree(id: string, contenido: string, Tree : FoodNode[]){
    let salida : boolean = false;
    Tree.every(elementTree => {
      console.log("ESTE ES EL NOMBRE DEL TREE:  " + elementTree.name + " " + "ESTE ES EL ID QUE SE BUSCA: " + id)
      if(elementTree.name === id){
        elementTree.contenido = contenido;
        console.log("contenido seteado")
        salida = true;
      }else{
        if(elementTree.children){


          this.busquedaTree(id,contenido,elementTree.children)
        }else{
          console.log("marca no encontra")

        }
      }
      if(salida == true){
        return false;
      }
      return true;
    });
  }
  changeMarca(id : string){
    console.log("marca actual: " , id)
    this.marcaActual = id; // puede ser la id provicional antes de enviar
  }
  buscarEstado(Tree : FoodNode[], id: string){
    let state : boolean = false;
    let salida : boolean = false;
    Tree.every(elementTree => {
      if(elementTree.name === id){
        state = true
        salida = true;
      }else{
        if(elementTree.children){
          state = this.buscarEstado(elementTree.children,id)
        }
      }
      if(salida == true){
        return false;
      }
      return true;
    });
    return state
  }
}
