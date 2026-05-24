export interface PrimaryButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export interface TabMenuProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
  counts?: Record<string, number>;
}
