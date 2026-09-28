// Certifications et cours en ligne.
// Niveau 1 : certifications professionnelles Oracle (grandes cartes + bouton "Vérifier").
// Niveau 2 : cours Coursera (liste compacte, chaque ligne mène au certificat).
const ORACLE = "https://catalog-education.oracle.com/ords/certview/sharebadge?id=";
const COURSERA = "https://coursera.org/verify/";

export const oracleCerts = [
  {
    title: "Oracle Cloud Infrastructure Certified Data Science Professional",
    seal: "OCI DS", // texte court au centre du sceau
    issued: "17 sept. 2026",
    validUntil: "17 sept. 2028",
    url: `${ORACLE}EA48836C2D03DBB271FDC73418979B20EC7BF13EEBE55E541EE592D2F54FE57E`,
  },
  {
    title: "Oracle Certified Professional: Java SE 17 Developer",
    seal: "JAVA 17",
    issued: "11 fév. 2026",
    url: `${ORACLE}12298DC2624BD546DE8BB9414643073BA1677EF5DB153516EC3DFD3ED7CBF537`,
  },
  {
    title: "Oracle Database Administration 2019 Certified Professional",
    seal: "DBA",
    issued: "3 sept. 2025",
    url: `${ORACLE}E7B8C749C2D438078F7EBEC8394704B89A09F3474335BB08196DFC90A112CCE0`,
  },
];

// Petit utilitaire : construit une ligne de cours à partir de son code Coursera
const course = (title, issuer, date, code) => ({ title, issuer, date, url: COURSERA + code });

export const courseGroups = [
  {
    theme: "Data, Cloud & DevOps",
    courses: [
      course("Advanced Spring Cloud Microservices & Deployment with Docker", "Packt", "déc. 2025", "VODK2TC5YB3C"),
      course("Introduction to Containers w/ Docker, Kubernetes & OpenShift", "IBM", "avr. 2025", "FOIZRECUIIYG"),
      course("Virtual Networks in Azure", "Whizlabs", "avr. 2025", "NPYGTXR63968"),
      course("Introduction to Git and GitHub", "Google", "avr. 2025", "OPW56T8CX5GM"),
      course("The Unix Workbench", "Johns Hopkins University", "mai 2024", "U6L3RD36Y3BJ"),
    ],
  },
  {
    theme: "Programmation",
    courses: [
      course("Introduction to Java and Object-Oriented Programming", "University of Pennsylvania", "janv. 2025", "GYWTM0FRG4JG"),
      course("Programming for Everybody (Getting Started with Python)", "University of Michigan", "mai 2024", "6PVCZW6SJP4Y"),
      course("Software Engineering: Software Design and Project Management", "HKUST", "mai 2024", "9SDK7R7HZ57B"),
      course("Introduction à la programmation orientée objet (en C++)", "EPFL", "févr. 2024", "TAJLCECRQQ8D"),
    ],
  },
  {
    theme: "Web",
    courses: [
      course("React Native", "Meta", "avr. 2025", "1Z0C89R8WQ17"),
      course("React Basics", "Meta", "avr. 2025", "5B5R3OL276DY"),
      course("Interactivity with JavaScript", "University of Michigan", "févr. 2024", "L2UTH4Z4PDLR"),
      course("Introduction to HTML5", "University of Michigan", "févr. 2024", "S2MADNSUL37F"),
      course("Introduction to CSS3", "University of Michigan", "févr. 2024", "GXDC4UJZDW26"),
    ],
  },
];
