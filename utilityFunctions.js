// let oneIngredientsArr = (oneIngredient(justIngredients))
// //routes: [{key: ‘dish’, title: ‘dish’}, {key: ‘dish’, title: ‘dish’}]
// function routes (arr) {
//   let final = []
//   let temp = []
//   let innerObj = {}
//   innerObj[‘key’] = arr[0][0]
//   innerObj[‘title’] = arr[0][0]
//   temp.push(innerObj)
//   if (arr.length === 1) {
//     temp.push({key: ‘dish’, title: ‘dish’})
//     return temp
//   } else {
//      let result = routes(arr.slice(1))
//      final = [...temp, ...result]
//   }
//   return final
// }

export const urlEncoded = arr => {
  let stringify = arr
    .join(',')
    .split(' ')
    .join('%20');
  return stringify;
};

export const cleanStr = (dietLabelArr, healthLabelsArr) => {
  let newArr = [...dietLabelArr, ...healthLabelsArr];
  let tempArr = newArr.map(el => {
    return el.split('_').join(' ');
  });
  return tempArr.join(', ');
};

export const convertData = (dishName, dishUrl, nutritionData) => {
  let dishObject = {};

  dishObject.name = dishName;
  dishObject.imgUrl = dishUrl;
  dishObject.healthLabels = cleanStr(
    nutritionData.dietLabels,
    nutritionData.healthLabels
  );
  dishObject.CHOCDF_KCAL =
    nutritionData.totalNutrientsKCal.CHOCDF_KCAL.quantity;
  dishObject.FAT_KCAL = nutritionData.totalNutrientsKCal.FAT_KCAL.quantity;
  dishObject.PROCNT_KCAL =
    nutritionData.totalNutrientsKCal.PROCNT_KCAL.quantity;
  dishObject.calories = nutritionData.calories;

  let totalNutrientKeys = Object.keys(nutritionData.totalNutrients);
  totalNutrientKeys.map(ele => {
    if (nutritionData.totalNutrients[ele].unit === 'mg') {
      return (dishObject[ele] = nutritionData.totalNutrients[
        ele
      ].quantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'g') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity * 1000;
      return (dishObject[ele] = newQuantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'µg') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 1000;
      return (dishObject[ele] = newQuantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'IU') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 40 / 1000;
      return (dishObject[ele] = newQuantity.toFixed(4));
    } else {
      return;
    }
  });

  return dishObject;
};

export const ingrNameFunc = finalIngrArr => {
  return finalIngrArr.map(eachIngrObj => {
    console.log('candy', eachIngrObj.name);
    return eachIngrObj.name; // ['rice', 'rice cake']
  });
};

export const portionQuantFunc = finalIngrArr => {
  return finalIngrArr.map(eachIngrObj => {
    return `${eachIngrObj.quantity} ${eachIngrObj.measurement}`; // ['1 cup', '1 oz']
  });
};

export const convertIngrData = (ingrName, portionQuant, nutritionData) => {
  let ingrObject = {};

  ingrObject.ingredientName = ingrName; // 'rice cake'
  ingrObject.portionSize = portionQuant; // '1 oz'
  ingrObject.healthLabels = cleanStr(
    nutritionData.dietLabels,
    nutritionData.healthLabels
  );
  ingrObject.CHOCDF_KCAL =
    nutritionData.totalNutrientsKCal.CHOCDF_KCAL.quantity;
  ingrObject.FAT_KCAL = nutritionData.totalNutrientsKCal.FAT_KCAL.quantity;
  ingrObject.PROCNT_KCAL =
    nutritionData.totalNutrientsKCal.PROCNT_KCAL.quantity;
  ingrObject.calories = nutritionData.calories;

  let totalNutrientKeys = Object.keys(nutritionData.totalNutrients);
  totalNutrientKeys.map(ele => {
    if (nutritionData.totalNutrients[ele].unit === 'mg') {
      return (ingrObject[ele] = nutritionData.totalNutrients[
        ele
      ].quantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'g') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity * 1000;
      return (ingrObject[ele] = newQuantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'µg') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 1000;
      return (ingrObject[ele] = newQuantity.toFixed(4));
    } else if (nutritionData.totalNutrients[ele].unit === 'IU') {
      let newQuantity = nutritionData.totalNutrients[ele].quantity / 40 / 1000;
      return (ingrObject[ele] = newQuantity.toFixed(4));
    } else {
      return;
    }
  });

  return ingrObject;
};
