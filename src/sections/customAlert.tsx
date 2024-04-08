import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CustomAlert = ({ message }: { message: string }) => {
    return (
      <Alert variant="destructive" className="mt-4 max-w-fit">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    );
  };
  
  export default CustomAlert;
