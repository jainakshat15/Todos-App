import { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, PlatformColor,ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Task from './components/Task';

export default function App() {


  const [task,setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [trigger,setTrigger] = useState(false);

const API_BASE = 'https://todos-jainakshat.herokuapp.com';

const googleId = '102703676972502019215';




  const GetTodos = () =>{
    axios.get(`${API_BASE}/todos/${googleId}`).then((response) => {
      setTaskItems(response.data)
    });
    
}

  useEffect(() => {
    GetTodos();
  }, [trigger])

  


  const completeTodo = (id) =>{
    axios.get(`${API_BASE}/todo/complete/${id}`)
    setTrigger(!trigger);
  }


  const handleAddTask = () =>{
    Keyboard.dismiss()
    axios.post(`${API_BASE}/todo/new`, {
      googleId: googleId,
      text: task
    })
    setTask(null);
    setShowModal(false);
    setTrigger(!trigger);

  }

 
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textWrapper}>
          <Text style={styles.userName}>Welcome</Text>
        </View>
        <View>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <View style={styles.addWrapper}>
                  <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.textWrapper}>
          <Text style={styles.tasksHeading}>YOUR TASKS</Text>
        </View>
     
      <ScrollView style={styles.items}>
        {taskItems.length?
          taskItems.map((i,index) => {
            return (
            <TouchableOpacity key={index} onPress={() => completeTodo(i._id)}>
              <Task task={i} text={i.text} deleted={() => setTrigger(!trigger)}/>
            </TouchableOpacity>)
           
          }): <Text style={styles.altText}>Add New Tasks Using + Button</Text>
        }
        
      
     </ScrollView>

      {showModal && <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>
          <View style={styles.modalHeadings}>
            <Text style={styles.addTask}>ADD TASK</Text>
            <TouchableOpacity  onPress={() => setShowModal(false)}>
              <View style={styles.delete}>
              <Text style={styles.close}>X</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TextInput style={styles.input} autoFocus placeholder={'Write a Task'}value={task} onChangeText={text => setTask(text)}/>
          <TouchableOpacity  onPress={() => handleAddTask()} >
              <View style={styles.createTaskButton}>
                  <Text style={styles.createTaskText}>CREATE TASK</Text>
              </View>
            </TouchableOpacity>
          
        </KeyboardAvoidingView>}
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202b3e',
    paddingTop: 50
  },
  header: {
    flexDirection: 'row',
    paddingLeft: 20,
    justifyContent: 'space-between',
    paddingRight: 20
  },
  textWrapper : {
    
  },
  buttons:{
    flexDirection: 'column',
    height: 30,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  LogoutBox: {
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    marginBottom: 10
  },
  logoutText: {
    fontFamily: 'monospace',
    color: 'white',
    fontSize: 15,
  },
  tasksHeading:{
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#61759b',
    marginLeft: 20,
    marginTop: 40
  },
  altText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: 'white',
    marginLeft: 20,
  },
sectionTitle : {
  fontSize: 15,
  fontWeight: 'bold',
  fontFamily: 'monospace',
  color: 'white'
},
userName:{
  fontSize: 20,
  fontWeight: 'bold',
  fontFamily: 'monospace',
  color: 'white'
},
items : {
  marginTop: 10,

},

writeTaskWrapper: {
  position: 'absolute',
  top: '25%',
  left: '5%',
  width: '90%',
  height: 200,
  backgroundColor: '#eee',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderRadius: 10
},
modalHeadings: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
},
addTask: {
  fontSize: 15,
  fontWeight: 'bold',
  fontFamily: 'monospace',
},

input: {
  paddingVertical: 20,
  paddingHorizontal: 15,
  backgroundColor: 'white',
  borderRadius: 5,
  borderColor: '#C0C0C0',
  borderWidth: 1,
  width: '90%',
  fontSize: 15,
  fontFamily: 'monospace',
},
addWrapper: {
  width: 40,
  height: 40,
  backgroundColor: 'pink',
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#C0C0C0',
  borderWidth: 1,

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
addText: {
  color: '#202b3e',
  fontSize: 20,
  fontWeight: 'bold',
},
createTaskButton:{
  backgroundColor: '#D61C4E',
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 5,
},
createTaskText: {
  color: 'white',
  fontFamily: 'monospace',
  fontSize: 15,
  fontWeight: 'bold'
},
});
