declare module "smtpjs" {
  export const Email: {
    send: (email: any) => Promise<any>;
  };
}
