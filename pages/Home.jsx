import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebase.js'
import { collection, getDocs } from "firebase/firestore"
import { useDispatch, useSelector } from 'react-redux'
import { currentImages } from '../redux/imagesSlice.js'
import Galery from '../components/Galery.jsx'
import '../styles/home.css'
import { useAuth0 } from '@auth0/auth0-react'
import { addUser, currentUser } from '../redux/userSlice.js'
import { currentAuth } from '../redux/authSlice.js'


function Home() {

    const dispatch = useDispatch()

    const [type, setType] = useState('photo')
    const [category, setCategory] = useState('all')
    const [subCategory, setSubcategory] = useState('all')
    const [color, setColor] = useState('all')

    const { user, isAuthenticated } = useAuth0()
    let imagesRedux = useSelector((state) => state.images.list)
    if (imagesRedux) {
        localStorage.setItem('imagesRedux', imagesRedux)
    } else {
        imagesRedux = localStorage.getItem('imagesRedux')
    }
    let userRedux = useSelector((state) => state.user.list)
    if (userRedux) {
        localStorage.setItem('userRedux', userRedux)
    } else {
        userRedux = localStorage.getItem('userRedux')
    }
console.log(imagesRedux)

    useEffect(() => {
        const getImages = async () => {
            const querySnapshot = await getDocs(collection(db, 'crudImg'));
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            dispatch(currentImages(docs));
        }
        getImages()

        const getUser = async () => {
            const querySnapshot = await getDocs(collection(db, 'crudUser'));
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id })
            });
            dispatch(currentUser(docs));

        }
        getUser()

        const setUsers = () => {
            try {
                const email = user?.email
                dispatch(addUser({ email }))
            } catch (error) {
                console.log(error)
            }
        }
        setUsers()
        const contextUser = () => {
            const user2 = userRedux.find((e) => { return e.email == user.email })
            dispatch(currentAuth(user2))

        }
        contextUser()
    }, [isAuthenticated])


    return (<>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container-home">
            <select onChange={(e) => setType(e.target.value)}>
                <option value="photo">Photo</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
            </select>
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="all">Category</option>
                <option value="sport">Sport</option>
                <option value="art">Art</option>
                <option value="architecture">Architecture</option>
                <option value="vehicle">Vehicle</option>
                <option value="nature">Nature</option>
            </select>
            <select onChange={(e) => setSubcategory(e.target.value)}>
                <option value="all">Sub category</option>
                {category == 'art' && <>
                    <option value="music">Music</option>
                    <option value="cartoon">Cartoon</option>
                    <option value="anime">Anime</option>
                    <option value="cinema">Cinema</option>
                    <option value="comic">Comic</option>
                    <option value="fantasy">Fantasy</option>
                </>}
                {category == 'sport' && <>
                    <option value="futbol">Football</option>
                    <option value="basketball">Basketball</option>
                    <option value="tennis">Tennis</option>
                    <option value="rugby">Rugby</option>
                    <option value="fight">Fight</option>
                    <option value="american">American</option>

                </>}
                {category == 'architecture' && <>
                    <option value="bridge">Bridge</option>
                    <option value="house">House</option>
                    <option value="tower">Tower</option>
                    <option value="stadium">Stadium</option>
                    <option value="building">Building</option>
                </>}
                {category == 'vehicle' && <>
                    <option value="car">car</option>
                    <option value="bicycle">bicycle</option>
                    <option value="skateboard">skateboard</option>
                    <option value="motorcycle">motorcycle</option>
                    <option value="plane">plane</option>
                </>}
            </select>
            <select onChange={(e) => setColor(e.target.value)}>
                <option value="all">Color</option>
                <option value="redf">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="violet">Violet</option>
                <option value="orange">Orange</option>
                <option value="black">Black</option>
                <option value="silver">Silver</option>
            </select>
        </div>

        <Galery imgs={imagesRedux} type={type} category={category} subCategory={subCategory} color={color} />

    </>)
}

export default Home