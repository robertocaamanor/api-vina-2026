export interface Competidor {
  pais: string;
  artista: string;
  cancion: string;
}

export interface ArtistaDia {
  dia: string;
  fecha: string;
  cantantes: string[];
  humorista: string;
}

export interface ParrillaFestival {
  nombre: string;
  edicion: string;
  animadores: string[];
  programacion: ArtistaDia[];
  competencia_folclorica: Competidor[];
  competencia_internacional: Competidor[];
}
