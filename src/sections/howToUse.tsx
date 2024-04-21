import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const cardContents = [
    "Step 1: ",
    "Step 2:",
    "Step 3:", 
    "Step 4:",
    "Step 5:"
  ];

  // Unterschiedliche Texte für jede Karte
  const additionalTexts = [
    "Think about what you want to summarise (text, PDF, image)",
    "Please note that your text must contain 15 words and may have a maximum of 10,000 words",
    "Insert the text, PDF, image in the field provided ",
    "Press the summarise button",
    "And you get your perfect summarised text back . Good or, what do you think ?  "
  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="h-[300px] w-[280px]">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {cardContents.map((content, index) => (
            <CarouselItem key={index}>
              {/* Hinzufügen der hover-Klasse für den Schatten */}
              <Card className="hover:shadow-lg">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {/* Hier wird die Klasse auf das span-Element angewendet */}
                  <span className={`text-gray-600 text-4xl font-bold mt-[-230px]`}>{content}</span>
                </CardContent>
                {/* Unterschiedlicher Text für jede Karte */}
                <div className="px-10">
                  <p className="font-semibold text-1xl mb-[100px] flex justify-center mt-[-200px] ">{additionalTexts[index]}</p>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}

export default CarouselDApiDemo;
