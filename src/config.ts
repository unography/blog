export const siteConfig = {
  url: 'https://dhruvkaran.com',
  title: 'Dhruv Karan',
  subtitle: 'Data Scientist, Photographer, weird AI artist',
  postsPerPage: 4,

  menu: [
    { label: 'Posts', path: '/' },
    { label: 'About me', path: '/pages/about' }
  ],

  author: {
    name: 'Dhruv',
    photo: '/photo.jpg',
    bio: 'Data Scientist, Photographer, weird AI artist',
    contacts: {
      email: 'k4r4n.dhruv@gmail.com',
      twitter: 'unography',
      github: 'unography',
      linkedin: 'karandhruv',
      instagram: 'unography'
    }
  }
} as const;

export type SiteConfig = typeof siteConfig;
