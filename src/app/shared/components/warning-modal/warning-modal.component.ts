import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface warningDialog {
  title: string;
  paragraph: string;
  btnPrimary: string;
}

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss'],
})
export class WarningModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public dataDialog: warningDialog) {}

  ngOnInit(): void {}
}
