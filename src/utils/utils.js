export const formatName = name =>
    name
        .trim()
        .split(" ")
        .map(character => character[0].toUpperCase() + character.slice(1))
        .join(" ");
