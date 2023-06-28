interface FilmCard {
  youtubeLink: string;
  title: string;
  about: string;
}

export const films = <FilmCard[]>[
  {
    youtubeLink: "https://www.youtube.com/embed/Vxv2Fe6U_gc",
    title: "Service above Self",
    about:
      "The unspoken story of special education teachers who devote their time, attention, and energy to help children with special needs (Autism, Dyslexia and behavioral disorders) cope with their everyday surroundings.",
  },
  {
    youtubeLink: "https://www.youtube.com/embed/9CVPPGYaytg",
    title: "Rony - The Virtual Friend",
    about:
      "The story of a lonely and dejected boy who finds solace in talking to an imaginary friend that turns out to be his long-suppressed alter ego.",
  },
];
