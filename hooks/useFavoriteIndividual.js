import { useEffect, useState } from 'react'
// import {addToFavorites, loginUser} from '../Redux/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, getImages, getImg } from '../redux/imagesAction'
import { doc, setDoc } from '@firebase/firestore'
import { db } from '../firebase/firebase'
// import { getErrors } from '../Redux/apiSlice'

export default function useFavoriteIndividual(id) {
  const dispatch = useDispatch()

  const images = useSelector((state) => state.images.list)
  // console.log(images)
  const detailImg = images.find((e) => (e.id == id))
  const email = useSelector((state) => state.auth.list.email)



  const [inFavor, setInfavor] = useState(false)
  const color = detailImg?.color
  const category = detailImg?.category
  const description = detailImg?.description
  let favorite = detailImg?.favorite

  const idUser = detailImg?.idUser
  const like = detailImg?.like
  const photo = detailImg?.photo
  const subCategory = detailImg?.subCategory
  const type = detailImg?.type


  useEffect(() => {
    // console.log('detailImg:',detailImg.photo)
    // console.log('fav:',fav)
    if (favorite?.includes(email)) setInfavor(true)

    console.log((favorite?.includes(email)))

  }, [favorite, email])

  const favor = () => {
    dispatch(addFavorite({ id, category, color, description, favorite, idUser, like, photo, subCategory, type, email }))
    setInfavor(!inFavor)

  }
  return [inFavor, favor]
}
