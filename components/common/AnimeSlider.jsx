'use client';

import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function AnimeSlider({ anime = [], isLoading = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!anime || anime.length === 0 || !isAutoPlaying || isInteracting) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % anime.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [anime, isAutoPlaying, isInteracting]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        goToNext();
      } else if (event.key === 'Escape') {
        handleToggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAutoPlaying]);

  const goToPrevious = useCallback(() => {
    if (!anime || anime.length === 0 || isInteracting) return;
    setCurrentIndex((prev) => (prev - 1 + anime.length) % anime.length);
  }, [anime, isInteracting]);

  const goToNext = useCallback(() => {
    if (!anime || anime.length === 0 || isInteracting) return;
    setCurrentIndex((prev) => (prev + 1) % anime.length);
  }, [anime, isInteracting]);

  const handleToggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 500);
  }, []);

  const handleTouchStart = (e) => {
    if (isInteracting) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (isInteracting) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (isInteracting || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) goToNext();
    else if (isRightSwipe) goToPrevious();

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (isLoading || !anime || anime.length === 0) {
    return (
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[700px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gray-100 shadow-2xl border border-gray-200 animate-pulse'></div>
      </div>
    );
  }

  const currentAnime = anime[currentIndex];

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
      <div
        ref={sliderRef}
        className='relative w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[700px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white shadow-2xl border border-gray-200 group transition-all duration-300'
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className='absolute inset-0'>
          <Image
            src={
              currentAnime?.images?.webp?.large_image_url ||
              currentAnime?.images?.jpg?.image_url ||
              '/placeholder.svg'
            }
            alt={currentAnime?.title || 'Anime'}
            fill
            className='object-cover transition-all duration-700 ease-out'
            style={{ opacity: 0.5 }}
            priority
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw'
          />
          <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/50 sm:from-black/75 sm:via-black/55 sm:to-black/45' />
          <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent backdrop-blur-xs' />
        </div>

        <div className='relative h-full flex items-center'>
          <div className='w-full px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20'>
            <div className='max-w-[calc(100%-4rem)] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto sm:mx-0'>
              <div className='flex flex-wrap items-center gap-2 mb-4 sm:mb-5'>
                {currentAnime?.genres?.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className='px-3 py-1.5 text-xs sm:text-sm rounded-full  text-white border border-white transition-all duration-300 font-medium'
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold line-clamp-2 text-white mb-4 sm:mb-5 leading-tight tracking-tight'>
                {currentAnime?.title}
              </h1>

              <div className='flex flex-wrap items-center gap-4 sm:gap-5 mb-4 sm:mb-5 text-sm sm:text-base'>
                <div className='flex items-center gap-1.5 bg-yellow-500/90 px-3 py-1.5 rounded-full'>
                  <Star className='w-5 h-5 text-yellow-100 fill-current' />
                  <span className='text-white font-bold'>
                    {currentAnime?.score || 'N/A'}
                  </span>
                </div>
                <span className='text-gray-200 font-medium'>
                  {currentAnime?.year || 'Unknown'}
                </span>
                <span className='text-gray-300'>
                  {currentAnime?.episodes
                    ? `${currentAnime.episodes} eps`
                    : 'Ongoing'}
                </span>
                <span className='text-gray-300'>{currentAnime?.type}</span>
                <span className='text-gray-300 border-l-2 border-gray-300 pl-2'>
                  {currentAnime?.rating || 'N/A'}
                </span>
              </div>

              <p className='text-gray-200 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl'>
                {currentAnime?.synopsis || 'No synopsis available.'}
              </p>

              <Link href={`/anime/${currentAnime?.mal_id}`}>
                <button className='group px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full bg-linear-to-r from-indigo-400 to-purple-500 text-white font-bold hover:from-indigo-500 hover:to-purple-600 active:scale-95 transition-all duration-300 text-sm sm:text-base shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5'>
                  <span className='flex items-center gap-2'>View Details</span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <button
          className='absolute left-3 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/90 hover:bg-white active:bg-gray-100 text-gray-700 hover:text-indigo-400 transition-all duration-300 backdrop-blur-md hover:scale-110 active:scale-95 border border-gray-200 hover:border-indigo-200 shadow-lg opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 z-30'
          onClick={goToPrevious}
          aria-label='Previous slide'
        >
          <ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6' />
        </button>

        <button
          className='absolute right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/90 hover:bg-white active:bg-gray-100 text-gray-700 hover:text-indigo-400 transition-all duration-300 backdrop-blur-md hover:scale-110 active:scale-95 border border-gray-200 hover:border-indigo-200 shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 z-30'
          onClick={goToNext}
          aria-label='Next slide'
        >
          <ChevronRight className='w-5 h-5 sm:w-6 sm:h-6' />
        </button>

        <div className='absolute top-4 sm:top-6 right-4 sm:right-6 z-30'>
          <button
            onClick={handleToggleAutoPlay}
            className='p-3 sm:p-4 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-indigo-400 transition-all duration-300 backdrop-blur-md border border-gray-200 hover:border-indigo-200 hover:scale-110 shadow-lg opacity-80 group-hover:opacity-100'
            aria-label={isAutoPlaying ? 'Pause autoplay' : 'Resume autoplay'}
          >
            {isAutoPlaying ? (
              <Pause className='w-5 h-5 sm:w-6 sm:h-6 fill-current' />
            ) : (
              <Play className='w-5 h-5 sm:w-6 sm:h-6 fill-current' />
            )}
          </button>
        </div>
      </div>
      <div className='text-black text-center font-medium md:hidden'>
        Swipe to navigate
      </div>
    </div>
  );
}
