import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          Will the website continue to be developed and will more features be added?
        </AccordionTrigger>
        <AccordionContent>
          Yes, this website is still under development, and more exciting features will be added. Stay tuned!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          How does the summarization work, and are important data safe?
        </AccordionTrigger>
        <AccordionContent>
          The website is based on the OCTO-AI API, and we do not have access to the files. OctoAI has access to them, so never summarize important data such as bank details here.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Can I interact with the website in any language?
        </AccordionTrigger>
        <AccordionContent>
          No, currently it is available in German and sometimes in English. We are working to offer many languages.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Is there a word limit for text summarization?
        </AccordionTrigger>
        <AccordionContent>
          There is no specific word limit, but summarization works best with texts containing at least 15 words.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          Can I summarize text from images?
        </AccordionTrigger>
        <AccordionContent>
          Yes, you can upload images with text, and the application will extract and summarize the text.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FAQ;
