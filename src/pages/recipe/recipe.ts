import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Recipe } from "../../models/recipe";
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { ShoppingListService } from "../../services/shopping-list";
import { RecipeService } from "../../services/recipe";

/*
  Generated class for the Recipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit {
  recipe:Recipe;
  index:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
  private slService:ShoppingListService,
  private recipeService:RecipeService) {}
  ngOnInit(){
    this.recipe=this.navParams.get('recipe');
    this.index=this.navParams.get('index');
     console.log(this.recipe);
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipePage, {mode:"Edit", recipe:this.recipe, index:this.index});
  }
  onAddIngredients(){
     this.slService.addItems(this.recipe.ingredients);
  }
  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
