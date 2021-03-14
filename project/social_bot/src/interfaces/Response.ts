import { HashtagStat } from "./HashtagStat";

export interface ApiResponse {
    ack: string;
    data: HashtagStat[];
    prev_page_url: string;
    next_page_url: string;
    current_page: number;
    max_pages: number;
  }
 