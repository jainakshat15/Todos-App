import axios from 'axios';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Task = (props) => {
  const API_BASE = 'https://todos-jainakshat.herokuapp.com';

  const deleteTodo = (id) =>{
    axios.delete(`${API_BASE}/todo/delete/${id}`);
    props.deleted();
}

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
      {props.task.complete?<View style={styles.circleCompleted}></View>
        :<View style={styles.circle}></View>
      }
        {props.task.complete?<Text style={styles.itemTextCompleted}>{props.text}</Text>
          :<Text style={styles.itemText}>{props.text}</Text>
        }
        
      </View>
      <TouchableOpacity onPress={() => deleteTodo(props.task._id)}>
      <View style={styles.delete}>
        <Text style={styles.close}>X</Text>
      </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#131a26',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 5
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: '#202b3e',
    borderRadius: 20,
    marginRight: 15,
    borderColor: 'white',
    borderWidth:1
  },
  circleCompleted:{
    width: 20,
    height: 20,
    backgroundColor: '#d81e5b',
    borderRadius: 20,
    marginRight: 15,
    borderColor: 'white',
    borderWidth:1
  },
  itemText: {
    maxWidth: '80%',
    color: 'white'
  },
  itemTextCompleted: {
    maxWidth: '80%',
    color: 'white',
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid'
  },
  delete: {
    width: 20,
    height: 20,
    borderColor: '#D61C4E',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D61C4E'
  
  },
  close: {
    color: 'white',
    fontWeight: 'bold'
  },
});

export default Task;