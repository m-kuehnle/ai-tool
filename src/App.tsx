import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ThemeProvider } from "next-themes";

// Sections
import Header from "./sections/header";
import TextInput from "./sections/textInput";
import PdfInput from "./sections/pdfInput";
import ImageInput from "./sections/imageInput";
import Background from "./sections/background";
import FAQ from "./sections/FAQ";
import BentoGridDemo from "./sections/examples";

function App() {
  return (
    <>
      <ThemeProvider attribute="class">
        <Header />

        <div className="m-4">
          <Tabs defaultValue="text-input">
            <TabsList>
              <TabsTrigger value="text-input">Input Text</TabsTrigger>
              <TabsTrigger value="file-input">Upload PDF</TabsTrigger>
              <TabsTrigger value="image-input">Upload Image</TabsTrigger>
            </TabsList>

            <TabsContent value="text-input">
              <TextInput />
            </TabsContent>

            <TabsContent value="file-input">
              <PdfInput />
            </TabsContent>

            <TabsContent value="image-input">
              <ImageInput />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-[100px]">
          <h3 className="font-bold text-3xl text-indigo-600 ml-[150px] underline sm:mt-[-60px]">
            Examples
          </h3>

          <div className="ml-[px] sm:ml-[-100px]">
            <BentoGridDemo />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="sm:m-40 m-8">
          <h2 className="mb-4 font-bold text-indigo-600 text-3xl mt-[100px] sm:mt-[150px] underline">
            FAQ
          </h2>
          <FAQ />
        </div>

        <Background />
      </ThemeProvider>
    </>
  );
}

export default App;
