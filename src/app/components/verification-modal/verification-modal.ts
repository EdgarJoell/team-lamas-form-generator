import {Component, inject, output, signal, WritableSignal} from '@angular/core';
import {VerificationService} from '../../services/verification/verification-service';

@Component({
  selector: 'app-verification-modal',
  imports: [],
  templateUrl: './verification-modal.html',
  styleUrl: './verification-modal.css',
})
export class VerificationModal {
  verificationService: VerificationService = inject(VerificationService);
  isVerified = output<boolean>();
  password: WritableSignal<string> = signal("");
  isLastChance: WritableSignal<boolean> = signal(false);

  updatePassword(event: Event) {
    this.password.set((event.target as HTMLInputElement).value)
  }

  async checkPassword() {
    const isTeamLamas: boolean = await this.verificationService.comparePasswords(this.password());

    if (!isTeamLamas && this.isLastChance()) {
      this.isVerified.emit(false);
    } else if (!isTeamLamas && !this.isLastChance()) {
      this.isLastChance.set(true);
      this.password.set("");
    } else {
      this.isVerified.emit(true);
    }
  }
}
