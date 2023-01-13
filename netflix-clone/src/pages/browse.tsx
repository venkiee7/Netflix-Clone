import React, { useEffect, useState } from "react";
import {
  fetchRequest,
  MovieResponse,
  MovieResult,
  MovieVideoInfo,
} from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import Banner from "../components/Banner";
import ContentRows from "../components/content-rows";
import Loader from "../components/loader";

export default function Browse() {
  return (
    <React.Suspense fallback={<Loader />}>
      <section className="absolute top-0">
        <Banner />
        <ContentRows
          endpoint={ENDPOINT.MOVIES_POPULAR}
          title="Popular"
        ></ContentRows>
        <ContentRows
          endpoint={ENDPOINT.MOVIES_TOP_RATED}
          title="Top Rated"
        ></ContentRows>
        <ContentRows
          endpoint={ENDPOINT.MOVIES_NOW_PLAYING}
          title="Now Playing"
        ></ContentRows>
      </section>
    </React.Suspense>
  );
}
