import {  } from "../components/movie-card"
import { ENDPOINT } from "./endpoints"

export type MovieResult = {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    [k: string]: unknown
  }

  export interface MovieResponse<T> {
    page: number
    results: T;
    total_pages: number
    total_results: number
    [k: string]: unknown
  }


  export type MovieVideoResult<T> = {
    id: number;
    results: T;
    [k: string]: unknown;
  };
  
  export type MovieVideoInfo = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
    [k: string]: unknown;
  };
  

export async function fetchRequest<T>(endpoint:string){
    const url = new URL(endpoint, import.meta.env.VITE_BASE_API)
    url.searchParams.append("api_key", import.meta.env.VITE_API_KEY);
    const response = await fetch(url);
    return response.json() as Promise<T>;
}

export async function fetchVideoInfo(id: string) {
  const response = await fetchRequest<MovieVideoResult<MovieVideoInfo[]>>(
    ENDPOINT.MOVIES_VIDEO.replace("{movie_id}", id)
  );
  return response.results.filter(
    (result) => result.site.toLowerCase() === "youtube"
  );
}