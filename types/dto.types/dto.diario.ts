import { DtoMarca } from "./dto.marcas";

export interface DtoDiario {
  TIMESTAMP_FM?: Number,
  FECHA_HORA?: string,
  DESCRIPCION?: string,
  MARCAS?: DtoMarca[]

}
