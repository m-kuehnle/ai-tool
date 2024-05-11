import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ThemeProvider } from "next-themes";

import Header from "./sections/header";
import TextInput from "./sections/textInput";
import PdfInput from "./sections/pdfInput";
import ImageInput from "./sections/imageInput";
import FAQ from "./sections/FAQ";
import Steps from "./sections/steps";
import Background from "./sections/background";
import Footer from "./sections/footer";
import BestTool from "./sections/bestTool";

function App() {
  const inputOptions = ["text-input", "file-input", "image-input"];
  return (
    <>
      <ThemeProvider attribute="class">
        <Header />

        <div className="m-4" id="summarizer">
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

        <div className="mt-10">
          <Steps />
        </div>

        <div className="mt-10">
          <FAQ />
        </div>

        <div className="mt-10">
          <BestTool />
        </div>

        <Footer />
      </ThemeProvider>
      <Background />
    </>
  );
}

export default App;
