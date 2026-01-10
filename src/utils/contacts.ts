export function getContactHref(name: string, value: string): string {
  const hrefs: Record<string, string> = {
    email: `mailto:${value}`,
    twitter: `https://twitter.com/${value}`,
    github: `https://github.com/${value}`,
    linkedin: `https://linkedin.com/in/${value}`,
    instagram: `https://instagram.com/${value}`,
    telegram: `https://t.me/${value}`,
    facebook: `https://facebook.com/${value}`,
    youtube: `https://youtube.com/${value}`,
    codepen: `https://codepen.io/${value}`,
    gitlab: `https://gitlab.com/${value}`,
    medium: `https://medium.com/@${value}`,
  };

  return hrefs[name.toLowerCase()] || value;
}
