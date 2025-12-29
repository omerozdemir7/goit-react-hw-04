import axios from "axios";

// Not: Gerçek uygulamada bu anahtarı .env dosyasında saklamalısınız.
const ACCESS_KEY = "AnkAr4xEH3FW_IMo09UGV5j5Z0uPVS-uBS8gA6DJUbw"; 
const BASE_URL = "https://api.unsplash.com";

// Görsel çekme fonksiyonu
export const fetchImages = async (query, page = 1) => {
  if (query) {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        client_id: ACCESS_KEY,
        query: query,
        page: page,
        per_page: 12,
        orientation: "landscape",
      },
    });
    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } else {
    const response = await axios.get(`${BASE_URL}/photos`, {
      params: {
        client_id: ACCESS_KEY,
        page: page,
        per_page: 12,
      },
    });
    return {
      results: response.data,
      total_pages: 10,
    };
  }
};
