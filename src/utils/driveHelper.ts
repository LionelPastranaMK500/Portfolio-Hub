export const getDriveDirectLink = (
  url: string | null | undefined
): string | undefined => {
  if (!url) return undefined;

  // Si no es de Google Drive, devolvemos la URL tal cual
  if (!url.includes("drive.google.com")) {
    return url;
  }

  // Intentamos extraer el ID
  const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);

  if (idMatch && idMatch[1]) {
    // Usamos el dominio lh3.googleusercontent.com que sirve el archivo raw directamente
    // sin redirecciones complejas que bloquean los navegadores.
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }

  return url;
};
