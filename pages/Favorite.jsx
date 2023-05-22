import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import Spiral from '../components/Spiral'
import useFetch from '../hooks/useFetch'
import '../styles/favorite.css'
import { useEffect } from 'react'
import { getImages } from '../redux/imagesAction'
import { Link } from 'react-router-dom'

function Favorite() {

    let favorites = useSelector((state) => state.images.list)
    let auth = useSelector((state) => state.auth.list.email)

    const dispatch = useDispatch()

    // console.log(auth,favorites)
    useFetch()

    useEffect(() => {
        dispatch(getImages())
    }, [])
    return (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            {favorites.length == 0 && <Spiral />}
            <div className='container-galery'>
                {favorites.map((val) => {
                    if (val.favorite?.includes(auth)) {
                        return (
                            <div key={val.id} className='container-img'>
                            <Link to={`/Detail/${val.id}`}>
                              <img className={val.id % 2 ? 'img' : 'img2'} src={val.photo} alt="" />
                            </Link>
                          </div>
                        )
                    }

                }

                )}

            </div>
        </>
    )
}

export default withAuthenticationRequired(Favorite)