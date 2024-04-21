import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const CustomAlert = ({ message }: { message: string }) => {
  return (
    <Alert variant="destructive" className="max-w-fit">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
};

export default CustomAlert;
