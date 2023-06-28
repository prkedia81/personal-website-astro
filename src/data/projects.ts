interface Project {
  link: string;
  imageLink: string;
  title: string;
  description: string;
}

export const projects = <Project[]>[
  {
    link: "/aggregate-terminal",
    imageLink:
      "https://res.cloudinary.com/dg24rzjez/image/upload/v1667497921/personal-website/projects/aggregate-terminal/aggregate-terminal.svg",
    title: "Aggregate Terminal",
    description:
      "Your one-stop investment analysis platform. Project made in my first year at college.",
  },
  {
    link: "/flirtaid",
    imageLink:
      "https://res.cloudinary.com/dg24rzjez/image/upload/v1667501323/personal-website/projects/flirtaid/flirtaid.png",
    title: "FlirtAid",
    description:
      "A dating app made for the students of JU by the students of JU. First project to go to market.",
  },
  {
    link: "/photography",
    imageLink:
      "https://res.cloudinary.com/dg24rzjez/image/upload/v1667581385/personal-website/projects/photography/photography.svg",
    title: "Photography",
    description:
      "A collection of my photographs from the last 5 years. Includes product images to nature",
  },
  {
    link: "/film-making",
    imageLink:
      "https://res.cloudinary.com/dg24rzjez/image/upload/v1667583818/personal-website/projects/film-making.svg",
    title: "Film Making",
    description:
      "Select short films I've been a part of. I contributed as the director and cinematographer.",
  },
];
