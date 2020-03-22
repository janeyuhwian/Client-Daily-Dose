import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SaveDish from './SaveDish'

export default class CurrentIngredient extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false
    };
    this.onSave = this.onSave.bind(this)
  }
  onSave() {
    this.setState({
      modalOpen: false
    })
    console.log('HELLO I SUBMITTED')
    // this.props.createDish(this.props.dishNut, values)
    // redirect to mealDiary)
  }

  render() {
    return (
      <View>
        <SaveDish modalOpen={this.state.modalOpen} onSave={this.onSave}/>
        <Text style={styles.name}>DISH NAME</Text>
        <Button title='Save Meal' onPress={() => {this.setState({modalOpen: true})}}/>
        <Text style={styles.ingredients}>ingredients listed here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
  },
  ingredients: {
    fontSize: 15,
  },
  image: {
    width: 100,
    height: 100,
  },
  donutGraph: {
    width: 90,
    height: 90,
  },
  barGraph: {
    width: 100,
    height: 200,
  },
});
