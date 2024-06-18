import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Function to capitalize the first letter
export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Function to lowercase the first letter
export const lowercaseFirstLetter = (string: string): string => {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

export const sentenceCase = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const lowerCase = (str: string): string => {
    return str.charAt(0).toLowerCase() + str.slice(1).toLowerCase();
};

export const titleCase = (str: string): string => {
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export function hashStringToSeed(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

export function seededRandom(seed: number) {
    const a = 1664525;
    const c = 1013904223;
    const m = Math.pow(2, 32);
    seed = (seed * a + c) % m;
    return seed / m;
}

export function generateRandomNumber(min: number, max: number, seed: string): number {
    const seedNumber = hashStringToSeed(seed);
    const randomValue = seededRandom(seedNumber);
    return Math.floor(randomValue * (max - min + 1)) + min;
}

export function generateImage(userId: string): string {
    const num = generateRandomNumber(1, 999, userId).toString().padStart(3, "0");
    return `https://ozgrozer.github.io/100k-faces/0/0/000${num}.jpg`;
}
