import {useRecoilState} from 'recoil'
import {imagesState,idState,resultState} from '../atom/userAtom';
import {useState,useEffect} from 'react'
import Card from './Card'
import axios from 'axios'

export default function Images({userData}) {
	// body...
	const [images,setImages] = useRecoilState(imagesState);
	const [id,setId] = useRecoilState(idState);
	const [firstArray,setFirstArray] = useState([]);
	const [secondArray,setSecondArray] = useState([]);
	const [thirdArray,setThirdArray] = useState([]);
	const [searchResult,setSearchResult] = useRecoilState(resultState)

	useEffect(()=>{
		setFirstArray([]);
		setSecondArray([])
		setThirdArray([])
		let firstColumn = []
		let secondColumn = []
		let thirdColumn = []
		images.forEach((image,i)=>{
			if(i%3 === 0){
				firstColumn.push(image)
			}else if(i%2 === 0){
				secondColumn.push(image)
			}else{
				thirdColumn.push(image)
			}
		})
		setFirstArray(firstColumn);
		setSecondArray(secondColumn);
		setThirdArray(thirdColumn);
	},[images])

	useEffect(()=>{
		setImages(userData[0].images)
	},[])

	const deleteImage = (img) =>{
		console.log(img)
		let index = images.indexOf(img)
		let existImg = [...images]
		existImg.splice(index,1)
		upload(existImg);
	} 

	const upload = async(existImg) => {
		console.log("ran")
		const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_ROUTE}/api/auth/create/${id}`,{
			images:existImg,
		})
		setImages(result.data.docs.images)
	}

	return (
		<div className='min-h-screen mt-10 w-full' >
			{searchResult ? 
				<div className="flex grid px-3 gap-2 md:gap-10 grid-cols-1 md:grid-cols-3">
					<div className="flex">
						<Card image={searchResult} idx={1} key={1} /> 
					</div> 
				</div>

				:

				<div className="flex grid px-3 gap-2 md:gap-10 grid-cols-1 md:grid-cols-3">
					<div className="flex flex-col">
						{
							firstArray.map((image,key)=>(
								<Card image={image} key={key} idx={key} deleteImage = {deleteImage} />
							))
						}
					</div>
					<div className="flex flex-col">
						{
							secondArray.map((image,key)=>(
								<Card image={image} key={key} idx={key} deleteImage={deleteImage} />
							))
						}
					</div>
					<div className="flex flex-col">
						{
							thirdArray.map((image,key)=>(
								<Card image={image} key={key} idx={key} deleteImage = {deleteImage} />
							))
						}
					</div>

				</div>

			}
		</div>
	)
}