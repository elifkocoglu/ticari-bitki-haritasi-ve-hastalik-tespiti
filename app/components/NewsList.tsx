import Parser from "rss-parser";

type Item = { title?: string; link?: string; contentSnippet?: string; pubDate?: string };

export default async function NewsList() {
  const parser = new Parser();
  const feedUrl = "https://news.google.com/rss/search?q=bitki%20OR%20tar%C4%B1m&hl=tr&gl=TR&ceid=TR:tr";
  let items: Item[] = [];
  try {
    const feed = await parser.parseURL(feedUrl);
    items = (feed.items || []).slice(0, 6);
  } catch {
    items = [];
  }

  if (items.length === 0) {
    return <p className="text-sm text-zinc-600">Şu an haber bulunamadı.</p>;
  }

  return (
    <ul className="grid md:grid-cols-3 gap-3">
      {items.map((it, idx) => (
        <li key={idx} className="border border-zinc-100 rounded-xl p-4 bg-zinc-50/50 hover:bg-white transition-colors">
          <a href={it.link} target="_blank" rel="noreferrer" className="text-primary font-medium hover:underline">
            {it.title}
          </a>
          {it.pubDate && <p className="text-xs text-zinc-500 mt-1">{new Date(it.pubDate).toLocaleDateString("tr-TR")}</p>}
          {it.contentSnippet && <p className="text-sm mt-2 text-zinc-700 line-clamp-3">{it.contentSnippet}</p>}
        </li>
      ))}
    </ul>
  );
}


