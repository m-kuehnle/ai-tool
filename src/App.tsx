import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ThemeProvider } from "next-themes";

// Sections
import Header from "./sections/header";
import TextInput from "./sections/textInput";
import PdfInput from "./sections/pdfInput";
import ImageInput from "./sections/imageInput";
import FAQ from "./sections/FAQ";
import CarouselDApiDemo from "./sections/howToUse"

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
        
        <h3 className="mb-4 font-bold text-indigo-600 text-3xl mt-[100px] ml-[50px]  flex justify-center sm:mt-[150px] underline">How do I use the tool correctly?</h3>
        <div className="mt-[70px] mb-[200px] flex justify-center ">
          <CarouselDApiDemo />
          </div>


     
        
       </ThemeProvider>
        

       

      
        
          
    </>
  );
}

export default App;
