import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

function BentoGridDemo() {
  function summarizeText(_arg0: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <div key={i}>
          <BentoGridItem
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
          {/* Button innerhalb des BentoGridItem */}
          <Button onClick={() => summarizeText(item.title)}>Summarize</Button>
        </div>
      ))}
    </BentoGrid>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "A text about Mars",
    description: "Click on this button to summarize the text about Mars.",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "A text about a famous Footballer",
    description: "Click on this button to summarize the text about the Footballer.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "A very long story",
    description: "Click on this button to summarize the very long story.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
];

export default BentoGridDemo;
