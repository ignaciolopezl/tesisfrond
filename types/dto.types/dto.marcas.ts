import { DtoContenido } from "./dto.contenido"

export interface DtoMarca {
  HORA_INICIO? : string
  HORA_FIN? : string
  TIPO? : string
  NOMBRE_MARCA? : string
  DESCRIPCION? : string
  ID_ORADOR? : number
  TIMESTAMP_INICIO? : number
  TIMESTAMP_FIN? : number
  CONTENIDO?: DtoContenido
  SUBMARCAS?: DtoMarca[]

}
