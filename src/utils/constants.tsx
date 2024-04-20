import Mars from "../assets/mars.jpg";
import Ronaldo from "../assets/ronaldo.jpg";
import Hund from "../assets/hund.jpg";

interface Item {
  title: string;
  description: string;
  header: JSX.Element;
  example_text: string;
}

export const items: Item[] = [
  {
    title: "A text about Mars",
    description: "Click on this card to summarize the text about Mars.",
    header: (
      <img
        src={Mars}
        alt="Mars"
        className="w-full h-32 object-cover rounded-xl"
      />
    ),
    example_text:
      "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the 'Red Planet'.",
  },
  {
    title: "A text about a famous footballer",
    description:
      "Click on this card to summarize the text about the footballer.",
    header: (
      <img
        src={Ronaldo}
        alt="Ronaldo"
        className="w-full h-32 object-cover rounded-xl"
      />
    ),
    example_text:
      "Cristiano Ronaldo, often hailed as one of the greatest footballers of all time, has left an indelible mark on the world of soccer. Born on February 5, 1985, in Madeira, Portugal, Ronaldo's journey from humble beginnings to global superstar is a testament to his unparalleled talent, dedication, and relentless work ethic.His illustrious career has seen him excel at some of the biggest clubs in Europe, including Sporting Lisbon, Manchester United, Real Madrid, and Juventus. With his remarkable speed, extraordinary dribbling skills, and lethal finishing ability, Ronaldo has shattered numerous records and won countless individual awards, including five Ballon d'Or titles. Beyond his on-field achievements, Ronaldo's impact transcends football. He is a global icon, admired for his philanthropy, charisma, and leadership both on and off the pitch. Ronaldo's immense popularity extends far beyond the realm of sports, with millions of followers on social media and lucrative endorsement deals with leading brands.Despite facing challenges and criticism throughout his career, Ronaldo's unwavering determination and passion for the game have propelled him to unprecedented heights. Whether he's representing his country on the international stage or dazzling fans with his performances for his club, Ronaldo's legacy as one of football's true legends is firmly cemented in history.",
  },
  {
    title: "A text about a dog",
    description: "Click on this card to summarize the text about the dog.",
    header: (
      <img
        src={Hund}
        alt="Hund"
        className="w-full h-32 object-cover rounded-xl"
      />
    ),
    example_text:
      "Dogs are domesticated mammals belonging to the family Canidae. They have long been close companions of humans and have adapted to various habitats and tasks throughout evolution. Due to their versatility, dogs are utilized worldwide in various roles, including as pets, working animals, guard dogs, therapy dogs, and hunting dogs.Dogs exhibit a wide range of sizes, colors, shapes, and temperaments, which have arisen through centuries of breeding and selection. Their anatomy includes features such as a strong jaw, pronounced sensory organs (such as sense of smell and hearing), and an adaptable spine that allows them to move easily and fulfill various tasks.Communication among dogs primarily occurs through body language, vocalizations, and scent marking. They possess a complex social structure and can interact with both each other and humans. Proper training and socialization are crucial for a dog's behavior and development.Dogs require a balanced diet, regular exercise, medical care, and appropriate grooming to stay healthy and happy. The responsibility that comes with owning a dog should be carefully considered and respected to ensure their needs are met and to foster a positive relationship between human and animal.",
  },
];

export const faqData = [
  {
    question:
      "Will the website continue to be developed and will more features be added?",
    answer:
      "Yes, this website is still under development, and more exciting features will be added. Stay tuned!",
  },
  {
    question: "How does the summarization work, and are important data safe?",
    answer:
      "The website is based on the OCTO-AI API, and we do not have access to the files. OctoAI has access to them, so never summarize important data such as bank details here.",
  },
  {
    question: "Can I interact with the website in any language?",
    answer:
      "No, currently it is available in German and sometimes in English. If the text doesn't come out in the language in which the text is, put it in a translated version. We are working to offer many languages.",
  },
  {
    question: "Is there a word limit for text summarization?",
    answer:
      "Yes, there is a text limit of 10,000 words. The AI ​​also needs 15 words to summarize something",
  },
  {
    question: "Can I summarize text from images?",
    answer:
      "Yes, you can upload images with text, and the application will extract and summarize the text.",
  },
];
