import data from '../../data.json';
import iconSources from '../../icons/sources.json';

const icons = import.meta.glob<string>('../../icons/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const recommendations = {
  ...data,
  items: data.categories.flatMap(category => data.items
    .filter(item => item.cat === category.id)
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN', { sensitivity: 'base' }))),
};
const verifiedSources: Record<string, { software: string; status: string }> = iconSources;
export const verifiedIconUrl = (item: { name: string; icon?: string }) => {
  if (!item.icon) return undefined;
  const source = verifiedSources[item.icon];
  return source?.status === 'verified' && source.software === item.name
    ? icons[`../../${item.icon}`]
    : undefined;
};
export const linkSource = (url: string) => {
  const source = new URL(url);
  return source.hostname === 'github.com'
    ? `官方仓库 · github.com${source.pathname}`
    : `官网 / 文档 · ${source.hostname.replace(/^www\./, '')}`;
};

