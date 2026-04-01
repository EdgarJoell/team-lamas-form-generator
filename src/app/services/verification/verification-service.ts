import {Injectable} from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  private hashedPassword: string = "$2b$10$B9Ufro.8pkcecJ1W4cdYKu6ZKGB.a.Lj4i4pAJFyM1jfivRFIguhK";

  // Here for when we want to change the hashed password,
  // Not to be used in Production
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.hashedPassword);
  }
}
