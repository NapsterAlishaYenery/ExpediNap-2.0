import { ButtonVariant } from "../../../components/ui/button/button";

export interface AlertOptions {
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  variant?: ButtonVariant;
}