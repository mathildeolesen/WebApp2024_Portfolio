import { formatDistance as fDistance } from "date-fns";
import { nb } from "date-fns/locale";

// Hvis man ønsker en "omtrent 5 timer siden.." type formattering
export function formatDistance(updatedAt: Date): string {
  return fDistance(updatedAt, new Date(), {
    addSuffix: true,
    includeSeconds: true,
    locale: nb,
  });
}