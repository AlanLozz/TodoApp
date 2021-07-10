import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../common/Colors';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("ToDo.db");

const CategorySelector = ({ setSelection, selection }) => {
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(`
                SELECT * FROM Category
            `, [], (err, res) => {
                if (err._err) {
                    console.log(err)
                }
                setCategories(res.rows._array);
            });
        });
    }, []);

    const setOption = (n) => {
        setSelection(n)
        setShowModal(false);
    };

    const ModalCategories = () => {
        return (
            <Modal
                transparent
                animationType="fade"
                visible={showModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <ScrollView style={styles.ScrollView}>
                            {
                                categories.map((category, index) => {
                                    return (
                                        <TouchableOpacity 
                                            key={index} 
                                            style={[styles.option, index !== categories.length-1 ? {borderBottomColor: '#BABABA', borderBottomWidth: 1.5}: null]} 
                                            onPress={() => setOption(category.id)}
                                        >
                                            <Text style={styles.text}>
                                                {category.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.btnCancelar}>
                            <Text style={styles.textCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    };

    return (
        <>
            <ModalCategories />
            <Text style={styles.title}>Categoria: </Text>
            <TouchableOpacity style={styles.selector} onPress={() => setShowModal(true)}>
                <Text style={styles.selectorText}>
                    {selection.length === 0 ? 'Seleccionar' : categories[categories.findIndex(x => x.id === selection )].name}
                </Text>
                <Icon icon={faSortDown} style={styles.icon} />
            </TouchableOpacity>
        </>
    )
}

export default CategorySelector;

const styles = StyleSheet.create({
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
        borderColor: colors.light,
        borderWidth: 1.5,
        width: '100%',
        height: 50,
        marginTop: 10
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 18
    },
    selectorText: {
        fontSize: 16
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
    option: {
        padding: 15,
        width: '100%',
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textCancelar: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.error
    },
    btnCancelar: {
        width: '100%',
        height: 50,
        borderColor: colors.error,
        borderWidth: 1.5,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    ScrollView: {
        width: '100%',
        maxHeight: '80%',
    }
})
