export const scrollToId = (event: MouseEvent, id: string) => {
  const element = document.getElementById(id);
  if (element === null) return;

  event.preventDefault();
  const offset = 100; // Adjust this value to scroll higher
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};
