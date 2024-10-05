export const scrollToId = (event: MouseEvent, id: string) => {
  const element = document.getElementById(id);
  console.log("HERE", element);
  if (element === null) return;

  console.log(element);
  event.preventDefault()
  const offset = 100; // Adjust this value to scroll higher
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};
