import Mars from "../assets/mars.jpg";
import Ronaldo from "../assets/ronaldo.jpg";
import Hund from "../assets/hund.jpg";
import Giraffe from "../assets/Giraffe_Screenshot.png";
import News from "../assets/News.png";
import Chocolate_Photo from "../assets/Chocolate_Photo.jpeg";
import animales from "../lib/australienAnimales-compressed.pdf";
import spacex from "../lib/spacex.pdf";
import nasa from "../lib/nasa.pdf";
import marsscreen from "../assets/marspdfscreen.png"
import nasascreen from "../assets/nasascreen.png"
import tierepdfscreen from "../assets/animales.png"

interface Item {
  title: string;
  description: string;
  header: string;
  input: string;
}

export const WORD_LIMIT_MAX = 10000;
export const WORD_LIMIT_MIN = 50;

export const text_examples: Item[] = [
  {
    title: "Mars",
    description: "Click on this card to use the text about Mars.",
    header: Mars,
    input:
      "Mars is the fourth planet from the Sun. Its surface appears orange-red due to iron(III) oxide dust, earning it the nickname 'the Red Planet'. It's quite bright in Earth's sky and often observed through telescopes due to its distinct features. Mars is a rocky planet, smaller than Earth, with a diameter of 6,779 km (4,212 mi). A day on Mars, called a sol, lasts 24.5 hours, while a Martian year equals 1.88 Earth years (687 Earth days). Mars has two small, irregular moons: Phobos and Deimos. The northern plains of Mars are relatively flat compared to the cratered southern highlands, known as the Martian dichotomy. The planet boasts massive extinct volcanoes like Olympus Mons, standing 21.9 km (13.6 mi) tall, and Valles Marineris, one of the largest canyons in the Solar System at 4,000 km (2,500 mi) long. Mars is geologically active, experiencing marsquakes, dust devils, and thin cirrus clouds. Its polar ice caps and thin atmosphere contain significant amounts of carbon dioxide. Surface temperatures vary widely from −78.5 °C (−109.3 °F) to 5.7 °C (42.3 °F) throughout the year, similar to Earth's seasonal changes, due to significant axial tilt",
  },
  {
    title: "Ronaldo",
    description:
      "Click on this card to use the text about Ronaldo.",
    header: Ronaldo,
    input:
      "Cristiano Ronaldo, often hailed as one of the greatest footballers of all time, has left an indelible mark on the world of soccer. Born on February 5, 1985, in Madeira, Portugal, Ronaldo's journey from humble beginnings to global superstar is a testament to his unparalleled talent, dedication, and relentless work ethic.His illustrious career has seen him excel at some of the biggest clubs in Europe, including Sporting Lisbon, Manchester United, Real Madrid, and Juventus. With his remarkable speed, extraordinary dribbling skills, and lethal finishing ability, Ronaldo has shattered numerous records and won countless individual awards, including five Ballon d'Or titles. Beyond his on-field achievements, Ronaldo's impact transcends football. He is a global icon, admired for his philanthropy, charisma, and leadership both on and off the pitch. Ronaldo's immense popularity extends far beyond the realm of sports, with millions of followers on social media and lucrative endorsement deals with leading brands.Despite facing challenges and criticism throughout his career, Ronaldo's unwavering determination and passion for the game have propelled him to unprecedented heights. Whether he's representing his country on the international stage or dazzling fans with his performances for his club, Ronaldo's legacy as one of football's true legends is firmly cemented in history.",
  },
  {
    title: "Dogs",
    description: "Click on this card to use the text about the dog.",
    header: Hund,
    input:
      "Dogs are domesticated mammals belonging to the family Canidae. They have long been close companions of humans and have adapted to various habitats and tasks throughout evolution. Due to their versatility, dogs are utilized worldwide in various roles, including as pets, working animals, guard dogs, therapy dogs, and hunting dogs.Dogs exhibit a wide range of sizes, colors, shapes, and temperaments, which have arisen through centuries of breeding and selection. Their anatomy includes features such as a strong jaw, pronounced sensory organs (such as sense of smell and hearing), and an adaptable spine that allows them to move easily and fulfill various tasks.Communication among dogs primarily occurs through body language, vocalizations, and scent marking. They possess a complex social structure and can interact with both each other and humans. Proper training and socialization are crucial for a dog's behavior and development.Dogs require a balanced diet, regular exercise, medical care, and appropriate grooming to stay healthy and happy. The responsibility that comes with owning a dog should be carefully considered and respected to ensure their needs are met and to foster a positive relationship between human and animal",
  },
];

export const image_examples: Item[] = [
  {
    title: "Giraffes",
    description: "Click on this card to summarize the text about the giraffe.",
    header: Giraffe,
    input: Giraffe,
  },
  {
    title: "Che Guevara",
    description: "Click on this card to summarize the text about the Che Guevara.",
    header: News,
    input: News,
  },
  {
    title: "Chocolate",
    description: "Click on this card to summarize the text about chocolate.",
    header: Chocolate_Photo,
    input: Chocolate_Photo,
  },
];

export const pdfexamples: Item[] = [
  {
    title: "Animales",
    description:
      "Click on this card to open the PDF about Animales.",
    header: tierepdfscreen ,

    input: animales,
  },
  {
    title: "NASA",
    description: "Click on this card to open the PDF about the NASA.",
    header: nasascreen,
    input: nasa,
  },
  {
    title: "Mars",
    description: "Click on this card to open the PDF about Mars.",
    header: marsscreen,
    input: spacex,
  },
];

export const faqData = [
  {
    question:
      "Will the website continue to be developed and will more features be added?",
    answer:
      "Absolutely! Our website is continually evolving, and we're committed to adding new features to enhance the user experience. Keep an eye out for exciting updates!",
  },
  {
    question: "How secure is my data?",
    answer:
      "We do not store the data you upload. However, our website utilizes the OCTO-AI API for text summarization. While we do not retain access to your files, it's essential to refrain from uploading sensitive information such as bank details.",
  },
  {
    question:
      "Can I interact with the website in languages other than English?",
    answer:
      "At present, our website primarily supports English. If your text is in another language, consider translating it before input. We're actively working to expand language support in the future.",
  },
  {
    question: "Is there a word limit for text summarization?",
    answer:
      "Yes, there is a maximum word limit of 10,000 words for summarization. Additionally, the AI requires at least 50 words to generate a meaningful summary.",
  },
  {
    question: "Can I summarize text from images?",
    answer:
      "Absolutely! Our website supports text extraction and summarization from images. Simply upload the image containing the text, and our application will handle the rest.",
  },
];
