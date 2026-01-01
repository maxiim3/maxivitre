import { contacts } from "~/utils/socialMedia";

export function useSubmitEmail() {
  let message = encodeURIComponent("J'ai une question !");

  return `mailto:${contacts.email}?subject=${message}`;
}
