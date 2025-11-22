// src/types/contact.ts

/**
 * Datos para enviar un mensaje de contacto
 * (Basado en ContactRequest.java)
 */
export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}
