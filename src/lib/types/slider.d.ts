export interface SubSliderItem {
  id: number;
  title: string;
  images: string[];
  is_active: boolean;
}

export interface SubSlidersMeta {
  next_cursor: string | null;
  prev_cursor: string | null;
  per_page: number;
}

export interface SubSlidersApiResponse {
  success: boolean;
  message: string;
  data: {
    data: SubSliderItem[];
    meta: SubSlidersMeta;
  };
}
