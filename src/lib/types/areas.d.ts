export interface Area {
  id: number;
  name: string;
  price: string;
}

export interface AreasApiResponse {
  success: boolean;
  message: string;
  data: Area[];
}
