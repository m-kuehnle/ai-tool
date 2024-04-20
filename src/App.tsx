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

function App() {
  return (
    <>
      <ThemeProvider attribute="class">
        {/* Header */}
        <Header />

        {/* Tabs */}
        <div className="m-4">
          <Tabs defaultValue="text-input">
            <TabsList>
              <TabsTrigger value="text-input">Text</TabsTrigger>
              <TabsTrigger value="file-input">PDF</TabsTrigger>
              <TabsTrigger value="image-input">Image</TabsTrigger>
            </TabsList>

            <TabsContent value="text-input" className="bg-muted p-4 rounded-lg">
              <TextInput />
            </TabsContent>

            <TabsContent value="file-input" className="bg-muted p-4 rounded-lg">
              <PdfInput />
            </TabsContent>

            <TabsContent
              value="image-input"
              className="bg-muted p-4 rounded-lg"
            >
              <ImageInput />
            </TabsContent>
          </Tabs>
        </div>

        {/* FAQ Section */}
        <div className="sm:m-40 m-8">
          <h2 className="mb-4 font-bold text-indigo-600 text-3xl mt-[100px] flex justify-center   sm:mt-[150px] underline">
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
