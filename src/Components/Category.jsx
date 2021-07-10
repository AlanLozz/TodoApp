import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../common/Colors';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("ToDo.db");

const Category = ({ category, reload }) => {
    const [showModal, setShowModal] = useState(false);

    const deleteCategory = (id) => {
        const query = `DELETE FROM Category WHERE id = ${id}`;
        const params = [];
        db.transaction(tx => {
            tx.executeSql(query, params, (error, success) => {
                if (error._error) {
                    console.log("Error" + error)
                }
                reload();
            })
        })
    };

    const ModalUpdate = () => {
        const [updateValue, setUpdateValue] = useState(category.name || "");

        const updateCategory = () => {
            const query = `UPDATE Category SET name = '${updateValue}' WHERE id = ${category.id}`;
            const params = [];
            if(updateValue.length !==0 ){
                db.transaction(tx => {
                    tx.executeSql(query, params, (error, success) => {
                        if (error._error) {
                            console.log("Error" + error)
                        }
                        reload();
                        setShowModal(false);
                    })
                })
            }
        };

        return (
            <Modal
                transparent
                visible={showModal}
                animationType="fade"
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Nombre: </Text>
                            <TextInput placeholder="Ej. Escuela, Mandado, Hogar..." style={styles.formControl} value={updateValue} onChange={e => setUpdateValue(e.nativeEvent.text)} />
                            <TouchableOpacity style={[styles.buttonModal, { backgroundColor: colors.secondary }]} onPress={() => updateCategory()}>
                                <Text style={styles.textButton}>Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonModal, { backgroundColor: colors.error }]} onPress={() => setShowModal(false)}>
                                <Text style={styles.textButton}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    };

    return (
        <>
            <ModalUpdate />
            <View style={styles.container} >
                <Text style={styles.Text}>{category.name || 'error'}</Text>
                <TouchableOpacity style={[styles.iconContainer, { backgroundColor: colors.warning }]} onPress={() => setShowModal(true)}>
                    <Icon icon={faEdit} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconContainer, { backgroundColor: colors.error }]} onPress={() => deleteCategory(category.id)}>
                    <Icon icon={faTrashAlt} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Category

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 10,
    },
    Text: {
        fontSize: 18,
        fontWeight: 'bold',
        width: '68%',
        marginLeft: 13
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    icon: {
        color: '#FFF'
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
    },
    textButton: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
});