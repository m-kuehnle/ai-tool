import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ThemeProvider } from "next-themes";

import Header from "./sections/header";
import TextInput from "./sections/textInput";
import PdfInput from "./sections/pdfInput";
import ImageInput from "./sections/imageInput";
import FAQ from "./sections/FAQ";
import CarouselDApiDemo from "./sections/howToUse";
import Background from "./sections/background";


function App() {
  const inputOptions = ["text-input", "file-input", "image-input"];
  return (
    <>
      <ThemeProvider attribute="class">
        <Header />

        <div className="m-4">
          <Tabs defaultValue="text-input">
            <TabsList>
              {inputOptions.map((value) => (
                <TabsTrigger key={value} value={value}>
                  {value === "text-input" && "Text"}
                  {value === "file-input" && "PDF"}
                  {value === "image-input" && "Image"}
                </TabsTrigger>
              ))}
            </TabsList>

            {inputOptions.map((value) => (
              <TabsContent
                key={value}
                value={value}
                className="bg-muted p-4 rounded-lg h-[90svh] overflow-auto"
              >
                {value === "text-input" && <TextInput />}
                {value === "file-input" && <PdfInput />}
                {value === "image-input" && <ImageInput />}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="sm:m-40 m-8">
          <h2 className="mb-4 font-bold text-indigo-600 text-3xl mt-[100px] flex justify-center sm:mt-[150px] underline">
            FAQ
          </h2>
          <FAQ />
        </div>

        <h3 className="mb-4 font-bold text-indigo-600 text-3xl mt-[100px] ml-[50px] flex justify-center sm:mt-[150px] underline">
          How to use the summarizer?
        </h3>
        <div className="mt-[70px] mb-[30px] flex justify-center ">
          <CarouselDApiDemo />
        </div>

        <Background />
      </ThemeProvider>
    </>
  );
}

export default App;
