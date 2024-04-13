import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ThemeProvider } from "next-themes";

// Components
import Header from "./sections/header";
import TextInput from "./sections/textInput";
import PdfInput from "./sections/pdfInput";
import ImageInput from "./sections/imageInput";
import Background from "./sections/background";
import FAQ from "./sections/FAQ";

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
        <div className="mt-40">
          <div className="font-bold text-indigo-600 text-3xl ">
          <h2>FAQ</h2>
          </div>
         
          <FAQ></FAQ>
        </div>

        <Background />
      </ThemeProvider>
    </>
  );
}

export default App;