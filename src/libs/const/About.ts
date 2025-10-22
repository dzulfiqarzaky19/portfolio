import { HOME_CONST } from "./Home";

export const ABOUT_CONST = {
  header: HOME_CONST[0],
  body: {
    experience: {
      title: "Experience",
      data: [
        {
          title: "Frontend Engineer",
          company: {
            name: "Raiz Invest Australia",
            link: "https://www.raizinvest.com.au/",
          },
          subTitle: "July 2023 – Aug 2025",
          stacks: ["React", "Next.js", "TypeScript"],
          description:
            "Built a cross-browser extension across Chrome, Safari, and Firefox includes mobile and desktop version. - Refactor legacy code, improving Lighthouse performance scores and developer experience. - Conducted code reviews to ensure quality, consistency and maintainabil",
        },
        {
          title: "Frontend Engineer",
          company: {
            name: "eDOT KSNI",
            link: "https://edot.id/en",
          },
          subTitle: "Sept 2022 – June 2023",
          stacks: ["Next.js", "TypeScript", "ANTD"],
          description:
            "Delivered enterprise dashboards, interactive maps, and data visualizations using Next.js and Ant Design. - Integrated REST/GraphQL APIs with backend services, improving reliability and feature delivery. - Partnered with backend teams in a high-volume production environment, consistently meeting de",
        },
        {
          title: "Frontend Engineer",
          company: {
            name: "Bank Mandiri",
            link: "https://www.bankmandiri.co.id/",
          },

          subTitle: "April 2022 – Aug 2022",
          stacks: [" React", "ANTD", "Redux"],
          description:
            " Optimized critical pages, reducing load times and improving performance KPIs. - Integrated maps and real-time charts into the application, enhancing user experience. - Collaborated with backend engineers to ensure data consistency and boost features delivery.",
        },
        {
          title: "Junior Full-stack",
          company: {
            name: "Consistech Solutions",
            link: "https://consistechsolution.com/",
          },
          subTitle: "Sept 2019 – Nov 2021",
          stacks: ["React", "Vue", "React Native", "Node"],
          description:
            "Built production-ready apps across ERP, HIS (Hospital Information System), and Payroll systems. - Developed scalable full-stack applications using React/Vue for frontend and Node.js for backend. - Owned end-to-end features, from system design to deployment, accross multiple client projects.",
        },
      ],
    },
  },
};
