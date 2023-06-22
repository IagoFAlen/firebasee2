import { useState, useEffect } from 'react';
import Tabela from './Tabela';
import PlayersContext from './PlayersContext';
import Formulario from './Formulario';
import { auth, db } from '../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    doc, addDoc, collection, query, onSnapshot, updateDoc,
    deleteDoc, where
} from "firebase/firestore";
function Players() {
    const [user, loading, error] = useAuthState(auth);
    const [listaObjetos, setListaObjetos] = useState([]);
    const [alerta, setAlerta] = useState({
        status: "", message: ""
    });
    const [objeto, setObjeto] = useState({
        id: "", posicao: "", overall: "",
        uid: user?.uid, usuario: user?.displayName, email:
            user?.email
    });
    const novoObjeto = () => {
        setObjeto({
            id: 0, posicao: "", overall: "",
            uid: user?.uid, usuario: user?.displayName, email:
                user?.email
        });
    }
    useEffect(() => {
        if (user?.uid != null) {
            const uid = user?.uid;
            const colRef = collection(db, "players");
            const q = query(colRef, where("uid", "==", uid))
            onSnapshot(q, (querySnapshot) => {
                setListaObjetos(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    posicao: doc.data().posicao,
                    overall: doc.data().overall,
                    usuario: doc.data().usuario,
                    email: doc.data().email,
                    uid: doc.data().uid
                })))
            })
        }
    }, [user]);
    const [editar, setEditar] = useState(false);
    const acaoCadastrar = async (e) => {
        e.preventDefault();
        if (editar) {
            try {
                const playerDocRef = doc(db, 'players', objeto.id)
                await updateDoc(playerDocRef, {
                    posicao: objeto.posicao,
                    overall: objeto.overall,
                    uid: objeto.uid,
                    usuario: objeto.usuario,
                    email: objeto.email
                })
                setAlerta({
                    status: "success", message: "Player atualizado com sucesso"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao atualizar o PLAYER: " + err
                });
            }
        } else { // novo
            try {
                addDoc(collection(db, 'players'),
                    {
                        posicao: objeto.posicao,
                        overall: objeto.overall,
                        uid: objeto.uid,
                        usuario: objeto.usuario,
                        email: objeto.email
                    }).then(function (docRef) {
                        setObjeto({ ...objeto, id: docRef.id });
                    })
                setEditar(true);
                setAlerta({
                    status: "success", message: "Player criado com sucesso"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao criar o PLAYER: " + err
                });
            }
        }
    };
    const acaoRemover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                const playerDocRef = doc(db, 'players', objeto.id)
                await deleteDoc(playerDocRef);
                setAlerta({
                    status: "success", message: "Player removido com sucesso!"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao remover: " + err
                });
            }
        }
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }
    return (
        <PlayersContext.Provider value={
            {
                listaObjetos, setListaObjetos, acaoRemover,
                alerta, setAlerta,
                objeto, setObjeto,
                editar, setEditar,
                acaoCadastrar, handleChange, novoObjeto
            }}>
            <Tabela />
            <Formulario />
        </PlayersContext.Provider>
    );
}
export default Players;