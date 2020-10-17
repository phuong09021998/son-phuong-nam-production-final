export const Types = {
  GET_CAROUSEL: 'site/get-carousel',
  GET_SITE_INFO: 'site/get-site-info',
  GET_CAROUSEL_ERROR: 'site/get-carousel-error',
  GET_SITE_INFO_ERROR: 'site/get-site-info-error',
  GET_CAROUSEL_SUCCESS: 'site/get-carousel-success',
  GET_SITE_INFO_SUCCESS: 'site/get-site-info-success',
};

export const getCarousel = () => ({
  type: Types.GET_CAROUSEL,
});

export const getCarouselSuccess = ({ items }: any) => ({
  type: Types.GET_CAROUSEL_SUCCESS,
  payload: {
    items,
  },
});

export const getSiteInfoSuccess = ({ items }: any) => ({
  type: Types.GET_CAROUSEL_SUCCESS,
  payload: {
    items,
  },
});

export const getSiteInfo = () => ({
  type: Types.GET_SITE_INFO,
});

export const getCarouselError = ({ error }: any) => ({
  type: Types.GET_CAROUSEL_ERROR,
  payload: {
    error,
  },
});

export const getSiteInfoError = ({ error }: any) => ({
  type: Types.GET_SITE_INFO_ERROR,
  payload: {
    error,
  },
});
