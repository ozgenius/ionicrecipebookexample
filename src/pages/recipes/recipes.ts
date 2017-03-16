import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import { RecipeService } from "../../services/recipe";
import { Recipe } from "../../models/recipe";
import { RecipePage } from "../recipe/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
     recipes:Recipe[];
     constructor(private navctrl:NavController, private recipeService:RecipeService){}
     
     onNewRecipe(){
      this.navctrl.push(EditRecipePage, {mode:'New'});
     }

     ionViewWillEnter(){
       this.onLoadRecipe();
     }

     onLoadRecipe(){
       this.recipes=this.recipeService.getRecipes();
     }
     onViewRecipe(recipe:Recipe,index:number){
       this.navctrl.push(RecipePage, {recipe:recipe, index:index});
     }

}
