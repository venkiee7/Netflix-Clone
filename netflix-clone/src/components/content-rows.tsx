import React, { useEffect, useRef, useState } from "react";
import { fetchRequest, MovieResponse, MovieResult } from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import ChevronLeft from "@heroicons/react/24/outline/ChevronLeftIcon";
import ChevronRight from "@heroicons/react/24/outline/ChevronRightIcon";
import PageIndicator from "./page-indicator";
import MovieCard from "./movie-card";

type RowProp = {
  endpoint: string;
  title: string;
};

const CARD_WIDTH = 200;

export default function ContentRows({ title, endpoint }: RowProp) {
  const slideRef = useRef<HTMLSelectElement>(null);
  const containerRef = useRef<HTMLSelectElement>(null);
  const [rowData, setRowData] = useState<MovieResult[]>([]);
  const [translateX, setTranslateX] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = useRef(0);
  const disablePrev = currentPage === 0;
  const disableNext = currentPage + 1 === pagesCount;
  async function fetchRowData() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(endpoint);
    setRowData(response.results.filter((res) => res.poster_path));
    // console.log(popularMovies);
  }

  function onNextClick() {
    if (slideRef.current) {
      let updatedTranslateX = translateX - getTranslateXValue();
      slideRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage + 1);
    }
  }

  function onPrevClick() {
    if (slideRef.current) {
      let updatedTranslateX = translateX + getTranslateXValue();
      slideRef.current.style.transform = `translateX(${updatedTranslateX}%)`;
      setTranslateX(updatedTranslateX);
      setCurrentPage(currentPage - 1);
    }
  }

  function getTranslateXValue() {
    let translateX = 0;
    if (slideRef.current) {
      translateX =
        ((cardsPerPage.current * CARD_WIDTH) / slideRef.current.clientWidth) *
        100;
    }
    return translateX;
  }

  useEffect(() => {
    if (setRowData?.length) {
      if (containerRef.current) {
        cardsPerPage.current = Math.floor(
          containerRef.current.clientWidth / CARD_WIDTH
        );
        setPagesCount(Math.ceil(rowData.length / cardsPerPage.current));
      }
    }
  });

  useEffect(() => {
    fetchRowData();
  }, []);

  return (
    <section className="row-container ml-12 hover:cursor-pointer">
      <h2 className="text-xl">{title}</h2>
      <PageIndicator
        className="mb-2 opacity-0 transition-opacity duration-300 ease-in"
        pagesCount={pagesCount}
        currentPage={currentPage}
      />
      <section>
        <section
          ref={containerRef}
          className="relative mb-8 flex flex-nowrap gap-2 overflow-hidden"
        >
          {!disableNext ? (
            <button
              className="absolute right-0 z-[1] h-full w-12 bg-black/25 opacity-0 transition-opacity duration-300 ease-in"
              onClick={onNextClick}
            >
              <ChevronRight />
            </button>
          ) : null}
          {!disablePrev ? (
            <button
              className="absolute z-[1] h-full w-12 bg-black/25 opacity-0 transition-opacity duration-300 ease-in"
              onClick={onPrevClick}
            >
              <ChevronLeft />
            </button>
          ) : null}
          <section
            ref={slideRef}
            className="flex gap-2 transition-transform duration-700 ease-linear"
          >
            {rowData?.map((row, index) => {
              // const { id, title, poster_path } = row;
              // console.log(row);

              return (
                <MovieCard
                  uid={`${row.id}-${title}`}
                  key={`${row.id}-${title}`}
                  {...row}
                />
              );
            })}
          </section>
        </section>
      </section>
    </section>
  );
}
