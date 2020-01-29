import {useState, useEffect} from 'react'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

let store
const coll = 'messages'

function useDB(room) {
    const [messages, setMessages] = useState([])

    function add(m) {
        setMessages(current => {
            const msgs = [m, ...current]
            msgs.sort((a,b)=> b.ts.seconds - a.ts.seconds)
            return msgs
        })
    }
    function remove(id) {
        setMessages(current=> current.filter(m=> m.id!==id))
    }
    
    useEffect(() => {
        store.collection(coll)
        .where('room','==',room)
        .onSnapshot(snap=> snap.docChanges().forEach(c=> {
            const {doc, type} = c
            if (type==='added') add({...doc.data(),id:doc.id})
            if (type==='removed') remove(doc.id)
        }))
    }, [])
    return messages
}

const db = {}
db.send = function(msg) {
    return store.collection(coll).add(msg)
}
db.delete = function(id) {
    return store.collection(coll).doc(id).delete()
}

export { db, useDB }

const firebaseConfig = {
  apiKey: "AIzaSyD5VQKLa_X2nuncYmgyrwwEDFyZjTLH_tQ",
  authDomain: "chattycathy2025.firebaseapp.com",
  databaseURL: "https://chattycathy2025.firebaseio.com",
  projectId: "chattycathy2025",
  storageBucket: "chattycathy2025.appspot.com",
  messagingSenderId: "12664040371",
  appId: "1:12664040371:web:1b92c6e2b9fa6ff2c8f9c6"
};

firebase.initializeApp(firebaseConfig)
store = firebase.firestore()