import { USAIcon } from "../icon/icon-types";

export const USA_ALERT_TYPES = [
  "info",
  "warning",
  "success",
  "error",
  "emergency",
] as const;

export type USAAlertType = (typeof USA_ALERT_TYPES)[number];

export interface USAAlert {
  icon: USAIcon;
}

export const USA_ALERT_CONFIG: Record<USAAlertType, USAAlert> = {
  info: {
    icon: "info",
  },
  warning: {
    icon: "warning",
  },
  success: {
    icon: "check_circle",
  },
  error: {
    icon: "error",
  },
  emergency: {
    icon: "error",
  },
};
