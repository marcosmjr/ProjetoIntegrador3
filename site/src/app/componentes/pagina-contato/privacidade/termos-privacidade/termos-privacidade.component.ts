import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-termos-privacidade',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './termos-privacidade.component.html',
  styleUrl: './termos-privacidade.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermosPrivacidadeComponent {

  readonly dialog = inject(MatDialog);

  termosPrivacidade() {
    const dialogRef = this.dialog.open(TermosPrivacidadeComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
@Component({
  selector: 'app-termos-privacidade-dialog',
  templateUrl: './termos-privacidade.component-dialog.html',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermosPrivacidadeComponentDialog {}