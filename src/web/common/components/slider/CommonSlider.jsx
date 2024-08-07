import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Scrollbar } from "swiper/modules";

// This is a common slider with scrollbar, this is a jsx file format because swiper not have typescript support

const defaultPaginationOptions = {
  clickable: true,
};

export const CommonSlider = ({
  children,
  scrollbarThumbColor = "#000000",
  scrollbarTrackColor = "#dddddd",
  spaceBetween,
  withPagination = false,
  slidesPerView = "auto",
  slideToIndex = 0,
  selectedIndex = 0,
  swiperContainerHeight = 55,
}) => {
  const swiperRef = useRef(null);


  useEffect(() => {
    if (swiperRef.current && !!selectedIndex) {
      swiperRef.current?.swiper.slideTo(slideToIndex); 
    }
  }, [selectedIndex]);

  useEffect(() => {
    register();

    const params = {
      modules: [Scrollbar, Pagination],
      slidesPerView: slidesPerView,
      withPagination: withPagination,
      spaceBetween: spaceBetween,
      Pagination: {
        clickable: true,
      },
      scrollbar: {
        draggable: true,
      },
      injectStyles: [
        `
        :host .swiper-horizontal {
          height: ${swiperContainerHeight}px !important;
        }
        :host .swiper-scrollbar-drag {
          background: ${scrollbarThumbColor};
          height: 2px !important;
        }
        :host .swiper-scrollbar {
          background: ${scrollbarTrackColor} !important;
          left: 0 !important;
          width: 100% !important;
          height: 2px !important;
          margin-top: 15px;
        }
        :host .swiper-horizontal {
          align-items: center;
        }
        `,
      ],
    };
    if (swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, []);

  return (
    <swiper-container init="false" ref={swiperRef}>
      {children}
    </swiper-container>
  );
};
