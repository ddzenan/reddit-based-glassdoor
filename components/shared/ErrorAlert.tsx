import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

/**
 * Props for the `ErrorAlert` component.
 *
 * @property {string} [title] - The title displayed in the alert. Defaults to `"Error"`.
 * @property {string} [description] - The description displayed below the title in the alert. Defaults to `"An error occurred, please try again later."`.
 */
type ErrorAlertProps = {
  title?: string;
  description?: string;
};

/**
 * A React component that renders a styled alert box for error messages.
 *
 * This component uses a destructive alert style and displays a customizable title and description.
 * It also includes an error icon for visual emphasis.
 *
 * @param {ErrorAlertProps} props - The properties passed to the `ErrorAlert` component, including optional `title` and `description`.
 * @returns {JSX.Element} A JSX element that renders the error alert with a title, description, and icon.
 */
export default function ErrorAlert({
  title = "Error",
  description = "An error occurred, please try again later.",
}: ErrorAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
