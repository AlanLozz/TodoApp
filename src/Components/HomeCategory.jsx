import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native'
import { colors } from '../common/Colors';
import Category from './Category';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("ToDo.db")

const ModalAdd = ({ visible, setVisible, reload }) => {
    const [nameCategory, setNameCategory] = useState("");

    const insertCategory = (name) => {
        db.transaction(tx => {
            tx.executeSql(`
                INSERT INTO Category(name) values('${name}')
            `)
        });
    };

    const addCategory = () => {
        if (nameCategory.length > 0){
            insertCategory(nameCategory);
            setVisible(false);
            setNameCategory("");
            reload();
        }
    }

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Nombre: </Text>
                        <TextInput placeholder="Ej. Escuela, Mandado, Hogar..." style={styles.formControl} value={nameCategory} onChange={e => setNameCategory(e.nativeEvent.text)} />
                        <TouchableOpacity style={[styles.buttonModal, { backgroundColor: colors.secondary }]} onPress={() => addCategory()}>
                            <Text style={styles.textButton}>Agregar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonModal, { backgroundColor: colors.error }]} onPress={() => setVisible(false)}>
                            <Text style={styles.textButton}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const AddCategory = () => {

    useEffect(() => {
        createTable();
    }, [])

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Category (
                    id integer primary key autoincrement,
                    name text
                );
            `)
        });
    };

    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setList();
    }, []);

    const setList = () => {
        const query = `SELECT * FROM Category`;
        var params = [];
        db.transaction(tx => {
            tx.executeSql(query, params, (err, results) => {
                if(err._err) console.log("Error" , err);
                setCategories(results.rows._array)
            })
        })
    }

    return (
        <View style={styles.container}>
            <ModalAdd visible={showModal} setVisible={setShowModal} reload={setList} />
            <ScrollView style={styles.ScrollView}>
                {
                    categories.map((category, index) =>{
                        return <Category category={category} key={index} reload={setList} />
                    })
                }
            </ScrollView>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => setShowModal(true)}>
                <Text style={styles.textButton}>Agregar Categoría</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    ScrollView: {
        width: '100%',
        height: '90%',
        padding: 20
    },
    buttonAdd: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 350,
        backgroundColor: colors.light,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        paddingVertical: 17,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        elevation: 20
    },
    formGroup: {
        width: '100%',
        flexDirection: 'column',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    formControl: {
        width: '100%',
        height: 50,
        fontSize: 16,
        borderColor: colors.secondary,
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: 10
    },
    buttonModal: {
        width: '100%',
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AddCategory;