import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { RecipeService } from "../../services/recipe";
import { Recipe } from "../../models/recipe";


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit{
  mode="New";
  selectOptions=['Easy', "Medium", "Hard"];
  recipe:Recipe;
  index:number;
  recipeForm:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private asController:ActionSheetController,
              private alertcontroller:AlertController,
              private toastController:ToastController,
              private recipeService:RecipeService) {}
  
ngOnInit(){
  this.mode=this.navParams.get('mode');
  if(this.mode=="Edit"){
     this.recipe=this.navParams.get('recipe');
     this.index=this.navParams.get('index');     
  }
  this.initializeForm();
}

onManageIngradients(){
   const acsheetcontroller=this.asController.create(
     {
       title:"What do u do?",
       buttons:[
         {
           text:'Add Ingredients',
           handler: ()=>{
            this.addNewIngredients().present();
           }
         },
         {
           text:"Remove all ingredients",
           role:"destructive",
           handler:()=>{
             const fArray:FormArray=<FormArray>this.recipeForm.get('ingredients');
             const len=fArray.length;
             if(len>0){
               for(let i=0;i<=len-1;i++){
                 fArray.removeAt(i);
               }
                 const toast=this.toastController.create(
                {
                  message:"All deleted",
                  duration:1000,
                  position:"bottom"
                }
              );
              toast.present();
             }
           }
         },
         {
           text:"Cancel",
           role:"Cancel"
         }
       ] 
     }
   );
   acsheetcontroller.present();
}

private addNewIngredients()
{
 return this.alertcontroller.create(
    {
      title:"Add Ingredient",
      inputs:[
        {
        name:'name',
        placeholder:"name" 
        }
      ],
      buttons:[
        {
          text:"Cancel",
          role:"cancel"
        },
        {
          text:"Add",
          handler:data=>{
            if(data.name.trim()=='' || data.name==null){
              const toast=this.toastController.create(
                {
                  message:"Please enter a valid value",
                  duration:1000,
                  position:"top"
                }
              );
              toast.present();
               return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(
              data.name,Validators.required
            ));
              const toast=this.toastController.create(
                {
                  message:"Item added",
                  duration:1000,
                  position:"bottom"
                }
              );
              toast.present();
          }
        }
      ]
    }
  );
}
onAddRecipe(){
  const value=this.recipeForm.value;
  let ingredients=[];
  if(value.ingredients.length > 0) {
    ingredients=value.ingredients.map(name=>{
      return {name:name, amount:1};
    });
  }
  if(this.mode=="Edit"){
    this.recipeService.updateRecipe(this.index,value.title,value.description,value.difficulty,ingredients);
  } else {
    this.recipeService.addRecipe(value.title,value.description,value.difficulty,ingredients);
  }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
}


private initializeForm(){
  let title=null;
  let description=null;
  let difficulty="Medium";
  let ingredients=[];
   if(this.mode=="Edit"){
     title=this.recipe.title;
     description=this.recipe.description;
     difficulty=this.recipe.difficulty;
     for(let ingredient of this.recipe.ingredients){
       ingredients.push(new FormControl(ingredient.name,Validators.required));
     }
   }
this.recipeForm=new FormGroup({
  'title': new FormControl(title,Validators.required),
  'description': new FormControl(description,Validators.required),
  'difficulty': new FormControl(difficulty,Validators.required),
  'ingredients': new FormArray(ingredients)
  
});
}

}
