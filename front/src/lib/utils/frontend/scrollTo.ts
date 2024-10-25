export const scrollToId = (
  id: string,
  { event }: { event?: MouseEvent } = {},
) => {
  const element = document.getElementById(id);
  if (element === null) return;

  event?.preventDefault();
  const offset = 100; // Adjust this value to scroll higher
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};
