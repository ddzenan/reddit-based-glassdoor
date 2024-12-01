import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

/**
 * Props for the `AlertDialogModal` component.
 *
 * @property {string} triggerButtonLabel - The label for the button that triggers the alert dialog.
 * @property {("outline" | "default" | "destructive")} [triggerButtonVariant="default"] - The style variant for the trigger button.
 * @property {string} [triggerButtonClassName] - Additional CSS class names for the trigger button.
 * @property {string} [title] - The title displayed at the top of the alert dialog.
 * @property {string} [description] - A description providing more details about the alert dialog.
 * @property {React.ReactNode} [children] - Additional JSX elements to render in the dialog's header.
 * @property {boolean} [hasCancelButton=true] - Indicates whether the alert dialog should include a cancel button.
 * @property {() => void} [onAction] - Callback function triggered when the action button is clicked.
 * @property {string} [actionLabel="Yes"] - The label for the action button.
 * @property {string} [cancelButtonClassName] - Additional CSS class names for the cancel button.
 * @property {string} [actionButtonClassName] - Additional CSS class names for the action button.
 * @property {boolean} [isActionButtonDisabled=false] - Whether the action button is disabled.
 */
type AlertDialogModalProps = {
  triggerButtonLabel: string;
  triggerButtonVariant?: "outline" | "default" | "destructive";
  triggerButtonClassName?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  hasCancelButton?: boolean;
  onAction?: () => void;
  actionLabel?: string;
  cancelButtonClassName?: string;
  actionButtonClassName?: string;
  isActionButtonDisabled?: boolean;
};

/**
 * A React component that renders an alert dialog with customizable trigger, content, and footer.
 * The dialog can include optional title, description, cancel, and action buttons.
 *
 * @param {AlertDialogModalProps} props - The properties for the component, including trigger details, content, and footer actions.
 * @returns {JSX.Element} A JSX element representing the alert dialog.
 */
export default function AlertDialogModal({
  triggerButtonLabel,
  triggerButtonVariant = "default",
  triggerButtonClassName,
  title,
  description,
  children,
  hasCancelButton = true,
  onAction,
  actionLabel = "Yes",
  cancelButtonClassName,
  actionButtonClassName,
  isActionButtonDisabled = false,
}: AlertDialogModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={triggerButtonVariant}
          className={triggerButtonClassName}
        >
          {triggerButtonLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {(title || description || children) && (
          <AlertDialogHeader>
            {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
            {description && (
              <AlertDialogDescription>{description}</AlertDialogDescription>
            )}
            {children}
          </AlertDialogHeader>
        )}
        {(hasCancelButton || onAction) && (
          <AlertDialogFooter>
            {hasCancelButton && (
              <AlertDialogCancel className={cancelButtonClassName}>
                Cancel
              </AlertDialogCancel>
            )}
            {onAction && (
              <AlertDialogAction
                onClick={onAction}
                className={actionButtonClassName}
                disabled={isActionButtonDisabled}
              >
                {actionLabel}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
