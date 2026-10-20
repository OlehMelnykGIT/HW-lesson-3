// ArticleList — рендер списку через map. key має бути унікальним і стабільним.
import type { Article } from '../../types/article';

interface ArticleListProps {
  items: Article[];
}

export default function ArticleList({ items }: ArticleListProps) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.objectID}>
          <a href={item.url} target="_blank" rel="noreferrer noopener">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
