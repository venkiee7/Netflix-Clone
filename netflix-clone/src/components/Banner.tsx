import React, { useEffect, useState } from "react";
import YouTube, {
  YouTubeEvent,
  YouTubePlayer,
  YouTubeProps,
} from "react-youtube";
import {
  fetchRequest,
  fetchVideoInfo,
  MovieResponse,
  MovieResult,
  MovieVideoInfo,
} from "../common/api";
import { ENDPOINT } from "../common/endpoints";
import { createImageURL } from "../common/utils";
import PlayCircleIcon from "@heroicons/react/24/solid/PlayIcon";
import Info from "@heroicons/react/24/outline/InformationCircleIcon";
import Loader from "./loader";

export default function Banner() {
  const [randomMovie, setRandomMovie] = useState<MovieResult>();
  const [videoInfo, setVideoInfo] = useState<MovieVideoInfo>();
  const [hidePoster, setHidePoster] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  function getRandomIndex(last: number) {
    return Math.floor(Math.random() * (last - 1));
  }
  const options: YouTubeProps["opts"] = {
    height: "800",
    width: document.body.clientWidth,
    playerVars: {
      autoplay: 1,
      playsinLine: 1,
      controls: 1,
    },
  };

  async function fetchPopularMovies() {
    const response = await fetchRequest<MovieResponse<MovieResult[]>>(
      ENDPOINT.MOVIES_POPULAR
    );
    const filteredMovies = response.results.filter(
      (movie) => movie.backdrop_path
    );
    const randomSelection =
      filteredMovies[getRandomIndex(filteredMovies.length)];

    setRandomMovie(randomSelection);

    const videoInfo = await fetchVideoInfo(randomSelection.id.toString());
    setVideoInfo(videoInfo[0]);
    setTimeout(() => {
      setHidePoster(true);
    }, 1800);
  }

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  function onStateChange(event: YouTubeEvent<number>) {
    if (event.data === 0) {
      setHidePoster(false);
      setShowBackdrop(true);
    } else if (event.data === 1) {
      setHidePoster(true);
      setShowBackdrop(false);
    }
  }

  return randomMovie ? (
    <section className="relative aspect-video h-[800px] w-full">
      <img
        src={createImageURL(
          randomMovie?.backdrop_path as string,
          0,
          "original"
        )}
        alt={randomMovie?.title}
        className={hidePoster ? `invisible h-0` : `visible h-full w-full`}
      />
      {videoInfo ? (
        <YouTube
          videoId={videoInfo?.key}
          id="banner-video"
          opts={options}
          className={`${
            hidePoster ? "visible h-full" : "invisible h-0"
          }absolute z-[1] -mt-14`}
          onStateChange={onStateChange}
        />
      ) : null}
      {showBackdrop ? (
        <section className="absolute top-0 left-0 z-[1] h-full w-full bg-dark/60"></section>
      ) : null}
      <section className="absolute bottom-16 z-[1] ml-16 flex max-w-sm flex-col gap-2">
        <h2 className="text-6xl">{randomMovie?.title}</h2>
        <p className="text-sm line-clamp-3">{randomMovie?.overview}</p>
        <section className="flex gap-2">
          <button className="flex w-[100px] items-center justify-center rounded-md bg-zinc-400/50 p-2 text-dark">
            <PlayCircleIcon className="h-8 w-8" /> <span>Play</span>
          </button>
          <button className="flex w-[150px] items-center justify-center rounded-md bg-zinc-400/50 p-2 text-white">
            <Info className="h-8 w-8" /> <span>More Info</span>
          </button>
        </section>
      </section>
    </section>
  ) : (
    <Loader />
  );
}
