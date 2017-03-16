import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../models/ingredient";
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  listItems:Ingredient[];
  constructor(private _slService:ShoppingListService){
  }
ionViewWillEnter(){
     this.getItems();
}

  onAddItem(form:NgForm){
         this._slService.addItem(form.value.ingredientName, form.value.amount);
         form.reset();
         this.getItems();
  }
  getItems(){
    this.listItems=this._slService.getItems();
  }
  onDeleteItem(index:number){
    this._slService.removeItem(index);
    this.getItems();
  }
}
