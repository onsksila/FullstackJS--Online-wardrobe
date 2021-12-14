export const jwtConstants = {
    secret: 'v%re$1%3432F',
    expiresIn: '30s' 
    
  };

 declare module "jsonwebtoken" {
    export function verify(
      token: string,
      secretOrPublicKey: string | Buffer,
      options?: VerifyOptions
    ): { email: object | string };
  }
  
 