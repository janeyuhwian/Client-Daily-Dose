import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Picker,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { consolidateData } from '../utilityFunctions';
import { finalizeIngredients, consolidatingData } from '../store/dishes';
import { resetDishnutFromConfirmation, resetIngrnutFromConfirmation } from '../store/nutrition'

class IngredientConfirmation extends React.Component {
  constructor({ navigation }) {
    super();
    this.navigation = navigation;
    this.state = {
      value: '',
      name: '',
      ingredients: [{ name: '', quantity: '1', measurement: 'oz' }],
      userAddedIngredients: [{ name: '', quantity: '1', measurement: 'oz' }],
    };
    this.handleChangeText = this.handleChangeText.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.fetchNutrition = this.fetchNutrition.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.removeUserAddedItem = this.removeUserAddedItem.bind(this);
  }

  componentDidMount() {
    this.navigation.addListener('focus', () => {
      this.setState({
        ...this.state,
        ingredients: this.props.ingredients,
        userAddedIngredients: this.props.userAddedIngredients,
      });
      this.props.resetDishnutFromConfirmation({})
      this.props.resetIngrnutFromConfirmation([])
    })
  }

  handleChangeText(newText) {
    this.setState({ value: newText });
  }

  addIngredient() {
    let addingIngredientClone = { ...this.state };
    addingIngredientClone.userAddedIngredients.push({
      name: this.state.value,
      quantity: '1',
      measurement: 'oz',
    });
    addingIngredientClone.value = '';
    this.setState(addingIngredientClone);
  }

  validateInformation() {
    let ingredientsArr = this.state.ingredients;
    let emptyfields = ingredientsArr.filter(obj => {
      if (obj.quantity === '0' || obj.quantity.length < 1) {
        return true;
      } else {
        return false;
      }
    });

    if (this.state.name === '') {
      alert('Please Enter a Dish Name');
      return false;
    }
    if (emptyfields.length > 0) {
      alert('Please Enter a Quantity for Every Ingredient');
      return false;
    }
    return true;
  }

  async fetchNutrition() {
    if (!this.validateInformation()) {
      return;
    }
    await this.props.finalizeIngredients(
      this.state.ingredients,
      this.state.userAddedIngredients,
      this.state.name
    );
    const consolidated = await consolidateData(this.props.finalIngredients);
    await this.props.consolidatingData(consolidated);
    let resetLocalState = {
      value: '',
      name: '',
      ingredients: [{ name: '', quantity: '1', measurement: 'oz' }],
      userAddedIngredients: [{ name: '', quantity: '1', measurement: 'oz' }],
    }
    this.setState(resetLocalState)
    return this.navigation.navigate('Dishes');
    }

  async removeIngredient(index) {
    let ingredientsClone = { ...this.state };
    ingredientsClone.ingredients.splice(index, 1);
    this.setState(ingredientsClone);
  }

  async removeUserAddedItem(index) {
    let userIngredientsClone = { ...this.state };
    userIngredientsClone.userAddedIngredients.splice(index, 1);
    this.setState(userIngredientsClone);
  }

  render() {
    const quantTypes = [{ value: 'oz' }, { value: 'g' }, { value: 'cup' }];
    return (
      <ScrollView>
        <View>
          <Text style={styles.headerText}>Confirm Your Ingredients:</Text>
          {this.state.ingredients.map((item, index) => {
            return (
              <View key={index} style={styles.ingredientView}>
                <Text style={styles.ingredientName}>{item.name}</Text>
                <TextInput
                  style={styles.quantityField}
                  placeholder="Enter A Numerical Value"
                  value={item.quantity}
                  onChangeText={text => {
                    let localStateClone = { ...this.state };
                    localStateClone.ingredients[index].quantity = text;
                    this.setState(localStateClone);
                  }}
                />
                <Picker
                  style={styles.dropdowns}
                  itemStyle={{ height: 45 }}
                  selectedValue={item.measurement}
                  onValueChange={value => {
                    let localState = { ...this.state };
                    localState.ingredients[index].measurement = value;
                    this.setState(localState);
                  }}
                >
                  {quantTypes.map((cateogry, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={cateogry.value}
                        value={cateogry.value}
                      />
                    );
                  })}
                </Picker>
                <Button
                  onPress={() => {
                    this.removeIngredient(index);
                  }}
                  title="Remove"
                  color="red"
                />
              </View>
            );
          })}
        </View>

        <View style={styles.main}>
          <Text style={styles.headerText}>Added By User:</Text>
          {this.state.userAddedIngredients.map((item, index) => {
            return (
              <View key={index} style={styles.ingredientView}>
                <Text style={styles.ingredientName}>{item.name}</Text>
                <TextInput
                  style={styles.quantityField}
                  placeholder="Enter A Numerical Value"
                  value={item.quantity}
                  onChangeText={text => {
                    let localUserAddedStateClone = { ...this.state };
                    localUserAddedStateClone.userAddedIngredients[
                      index
                    ].quantity = text;
                    this.setState(localUserAddedStateClone);
                  }}
                />
                <Picker
                  style={styles.dropdowns}
                  itemStyle={{ height: 45 }}
                  selectedValue={item.measurement}
                  onValueChange={value => {
                    let localState = { ...this.state };
                    localState.userAddedIngredients[index].measurement = value;
                    this.setState(localState);
                  }}
                >
                  {quantTypes.map((cateogry, index) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={cateogry.value}
                        value={cateogry.value}
                      />
                    );
                  })}
                </Picker>
                <Button
                  onPress={() => {
                    this.removeUserAddedItem(index);
                  }}
                  title="Remove"
                  color="red"
                />
              </View>
            );
          })}
        </View>

        <View style={styles.addItem}>
          <Text style={styles.headerText}>Add An Additional Ingredient:</Text>
          <TextInput
            style={styles.ingredientView}
            placeholder="Your Ingredient"
            defaultValue={this.state.value}
            onChangeText={this.handleChangeText}
          />
          <Button onPress={this.addIngredient} title="Add" color="#659B0E" />
        </View>

        <View style={styles.addItem}>
          <Text style={styles.headerText}>Confirm Name Of Dish (Required)</Text>
          <TextInput
            style={styles.ingredientView}
            placeholder="i.e. Vegan Pasta Salad"
            value={this.state.name}
            onChangeText={text => {
              let localStateDish = { ...this.state };
              localStateDish.name = text;
              this.setState(localStateDish);
            }}
          />
        </View>

        <View style={styles.addItem}>
          <Button
            onPress={this.fetchNutrition}
            title="All Set! Get Me Nutritional Information"
            color="green"
          />
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    ingredients: state.dishes.ingredients,
    userAddedIngredients: state.dishes.userAddedIngredients,
    finalIngredients: state.dishes.finalIngredients,
    consolidatedData: state.dishes.consolidatedData,
    name: state.dishes.name
  };
};

const mapDispatch = dispatch => {
  return {
    finalizeIngredients: (ingredients, userIngredients, name) =>
      dispatch(finalizeIngredients(ingredients, userIngredients, name)),
    consolidatingData: consolidated =>
      dispatch(consolidatingData(consolidated)),
    resetDishnutFromConfirmation: obj =>
      dispatch(resetDishnutFromConfirmation(obj)),
    resetIngrnutFromConfirmation: arr =>
      dispatch(resetIngrnutFromConfirmation(arr))
  };
};


export default connect(mapState, mapDispatch)(IngredientConfirmation);

const styles = StyleSheet.create({
  ingredientView: {
    flexDirection: 'row',
    height: 45,
    marginTop: 25,
  },
  ingredientName: {
    width: 80,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingTop: 12,
  },
  quantityField: {
    width: 45,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  dropdowns: {
    width: 150,
  },
  headerText: {
    fontWeight: 'bold',
    backgroundColor: '#659B0E',
    padding: 10,
    marginTop: 25,
  },
});