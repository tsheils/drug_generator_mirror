/**
 * Created by sheilstk on 6/16/17.
 */
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatMenuModule, MatToolbarModule, MatInputModule, MatIconModule,
  MatListModule, MatSliderModule, MatProgressSpinnerModule, MatSortModule, MatSidenavModule,
  MatSlideToggleModule, MatRadioModule, MatCheckboxModule, MatTabsModule, MatCardModule, MatTooltipModule,
  MatSelectModule, MatExpansionModule
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';




@NgModule({
  imports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSidenavModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatSelectModule, MatExpansionModule, MatSnackBarModule],
  exports: [MatButtonModule, MatAutocompleteModule, MatMenuModule, MatToolbarModule,
    MatInputModule, MatIconModule, MatListModule, MatSliderModule, MatProgressSpinnerModule,
    MatTableModule, MatSortModule, MatSidenavModule, MatSlideToggleModule, MatRadioModule,
    MatTabsModule, MatCheckboxModule, MatCardModule, MatTooltipModule, MatSelectModule, MatExpansionModule, MatSnackBarModule],
})
export class MaterialModule { }

