export interface AlertaState {
  variant: 'default' | 'destructive' | 'success' | 'info' | 'warning';
  title: string;
  description: string;
}