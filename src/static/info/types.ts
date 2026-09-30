export type Introduction = {
  name: string;
  role: string;
  about: string;
};

export interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  category: string;
  guid: string;
}
