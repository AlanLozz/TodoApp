import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import Task from './Task';
import Fab from '../common/Fab';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';

const db = SQLite.openDatabase("ToDo.db");

const Home = ({navigation}) => {
    const isFocused = useIsFocused();

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    },[isFocused, tasks]);

    const loadTasks = () => {
        db.transaction( tx => {
            tx.executeSql(`
                SELECT * FROM Task INNER JOIN Category ON Category.id = Task.categoryId
            `,[], (err, tasks) => {
                if(err._err) console.log(err);
                setTasks(tasks.rows._array);
            });
        })
    }

    return (
        <>
            <ScrollView style={styles.Home}>
                <View style={styles.taskContainer}>
                    {
                        tasks.map((task, index) => {
                            return <Task key={index} task={task} reload={loadTasks} navigation={navigation} />
                        })
                    }
                </View>
            </ScrollView>
            <Fab nav={navigation} />
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    Home: {
        width: '100%',
        height: '100%',
        padding: 15
    },
    taskContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
