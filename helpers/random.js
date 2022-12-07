export function random() {
    return Math.random().toString(36).substr(2); // Eliminar `0.`
};