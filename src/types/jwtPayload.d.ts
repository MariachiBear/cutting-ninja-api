interface JWTPayload {
   [key: string]: string | number;
   email: string;
   userId: string;
   iat: number;
   exp: number;
}
