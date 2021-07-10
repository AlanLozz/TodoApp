import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { colors } from '../common/Colors';
import Selector from './Selector';
import CategorySelector from './CategorySelector';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("ToDo.db");

const AddTaks = ({navigation , route}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(0);
    const [categorySelected, setCategorySelected] = useState("");
    
    useEffect(() => {
        db.transaction( tx => {
            tx.executeSql(`
                SELECT * FROM Task WHERE id = ${route.params.id}
            `,[], (tx, data) => {
                const { title, description, categoryId, priority } = data.rows._array[0];
                setTitle(title);
                setDescription(description);
                setCategorySelected(categoryId);
                setPriority(priority);
            });
        });
    }, []);

    const updateTask = () => {
        db.transaction( tx => {
            tx.executeSql(`
                UPDATE Task SET title = '${title}', description = '${description}', categoryId = ${categorySelected}, priority= ${priority}) WHERE id = ${route.params.id}
            `,[], (err, res) => {
                console.log(res)
            });
        })
        navigation.goBack();
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Titulo: </Text>
            <TextInput style={styles.formControl} placeholder="Ej. Tarea Historia" value={title} onChange={ e => setTitle(e.nativeEvent.text)} />
            <Text style={[styles.label, { marginTop: 20 }]}>Descripción: </Text>
            <TextInput style={styles.formControl} multiline placeholder="Ej. Investigar sobre la revolución mexicana" value={description} onChange={ e => setDescription(e.nativeEvent.text)} />
            <CategorySelector selection={categorySelected} setSelection={setCategorySelected} />
            <Selector selection={priority} setSelection={setPriority} />
            <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.goBack()}>
                <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRight} onPress={() => updateTask()}>
                <Text style={styles.textButton}>Guardar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddTaks

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        padding: 20,
        flexDirection: 'column',
    },
    formControl: {
        width: '100%',
        height: 50,
        borderColor: colors.light,
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonLeft: {
        backgroundColor: colors.error,
        width: '40%',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 20,
        left: 20,
        borderRadius: 10
    },
    buttonRight: {
        backgroundColor: colors.primary,
        width: '40%',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 10
    },
    textButton: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
})
