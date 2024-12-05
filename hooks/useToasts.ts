import { useToast } from "./use-toast";

const SUCCESS_DURATION = 5000;

const ERROR_DURATION = 5000;
const ERROR_MESSAGE = {
  title: "Uh oh! Something went wrong.",
  description: "Please try again later.",
};

/**
 * Custom hook that provides a function to show a success toast notification.
 * The toast will display a title (optional) and will automatically close.
 *
 * @returns {(title?: string) => void} A function that triggers a success toast with an optional title.
 */
export function useSuccessToast() {
  const { toast } = useToast();
  return (title?: string) => {
    toast({
      title,
      duration: SUCCESS_DURATION,
    });
  };
}

/**
 * Custom hook that provides a function to show an error toast notification.
 * The toast will display a default error message and description, and will automatically close.
 *
 * @returns {(description?: string) => void} A function that triggers an error toast with a predefined error message and description.
 */
export function useErrorToast() {
  const { toast } = useToast();
  return (description?: string) => {
    toast({
      variant: "destructive",
      title: ERROR_MESSAGE.title,
      description: description ?? ERROR_MESSAGE.description,
      duration: ERROR_DURATION,
    });
  };
}
