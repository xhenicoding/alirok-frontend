export const humanizeName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/(?:^|\s)(?!da|de|do)\S/g, (l: string) => l.toUpperCase())
}
