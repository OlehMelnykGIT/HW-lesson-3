// Сервіс для HTTP-запитів: уся робота з axios і URL — тут, а не в компонентах.
import axios from 'axios';
import type { Article } from '../../types/article';

interface ArticlesHttpResponse {
  hits: Article[];
}

// Дженерик <ArticlesHttpResponse> типізує response.data
export const fetchArticles = async (topic: string): Promise<Article[]> => {
  const response = await axios.get<ArticlesHttpResponse>(
    `https://hn.algolia.com/api/v1/search?query=${topic}`,
  );

  return response.data.hits;
};
