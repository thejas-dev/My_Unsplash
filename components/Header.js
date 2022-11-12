import Logo from '../public/logo.png'
import Image from 'next/image'
import {AiOutlineSearch,AiOutlinePlusCircle} from 'react-icons/ai'
import {useState,useEffect} from 'react'
import axios from 'axios';
import {useRecoilState} from 'recoil'
import {imagesState,idState,resultState} from '../atom/userAtom';
import Backdrop from '@mui/material/Backdrop';


export default function Header() {
	// body...
	const [label,setLabel] = useState('');
	const [url,setUrl] = useState('');
	const [password,setPassword] = useState('');
	const originalPass = '4848'
	const [images,setImages] = useRecoilState(imagesState);
	const [id,setId] = useRecoilState(idState);
	const [open, setOpen] = useState(false);
	const [search,setSearch] = useState('');
	const [passCorrect,setPassCorrect] = useState(false);
	const [searchResult,setSearchResult] = useRecoilState(resultState)
	
	useEffect(()=>{
		images.forEach((image,i)=>{
			if(search === image.label){
				setSearchResult(image)
			}
		})

	},[search])

	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	const check = (e) =>{
		e.preventDefault();
		if(password === originalPass){
			create();
		}else{
			alert('Wrong Password')
		}
	}

	const checkPass = (z) =>{
		if(z === originalPass){
			setPassCorrect(true)
		}else{
			setPassCorrect(false)
		}
	}

	const create = () =>{
		const newImage = {
			label:label,
			url:url
		}
		let existImg = [newImage,...images]
		upload(existImg);		
	}

	const upload = async(existImg) =>{
		console.log("ran")
		const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_ROUTE}/api/auth/create/${id}`,{
			images:existImg,
		})
		console.log(result)
		handleClose();
		setLabel('')
		setPassword('')
		setUrl('')
		setImages(result.data.docs.images);
	}

	return(
		<div className="w-full mt-5 md:mt-10 px-2 md:px-8 flex items-center" >
			<Backdrop
			  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			  open={open}
			>
				<div className="flex-col bg-white md:w-1/2 w-[90%] rounded-2xl text-black p-7">
					<div className="flex gap-2">
					<h1 className="text-xl font-semibold" >Add a new photo</h1>
					<AiOutlinePlusCircle className="h-7 w-7 text-green-500"/>
					</div>
					<form onSubmit={(e)=>{check(e)}} className="mt-7" >
						<div className="flex flex-col" >
							<label className="text-gray-600" >Label</label>
							<input type="text"
							value={label}
							onChange={(e)=>setLabel(e.target.value)}
							className="w-full outline-none px-2 py-5 mt-2 text-gray-700 border-2 
							border-gray-200 focus:border-gray-400 rounded-2xl"
							placeholder="Label of Image" />
						</div>
						<div className="flex flex-col mt-5" >
							<label className="text-gray-600" >URL</label>
							<input type="text"
							value={url}
							onChange={(e)=>setUrl(e.target.value)}
							className="w-full outline-none px-2 py-5 mt-2 text-gray-700 border-2 
							border-gray-200 focus:border-gray-400 rounded-2xl"
							placeholder="URL of Image only" />
						</div>
						<div className="flex flex-col mt-5" >
							<label className="text-gray-600" >Password</label>
							<input type="password"
							value={password}
							onChange={(e)=>{
								checkPass(e.target.value)
								setPassword(e.target.value)
							}}
							className={`w-full outline-none px-2 py-5 mt-2 text-gray-700 border-2 
							${passCorrect ? "focus:border-green-500" : "focus:border-red-500" } border-gray-400 rounded-2xl`}
							placeholder="Key" />
						</div>
						<div className="flex w-full justify-end mt-5">
							<button 
							className="px-5 py-2 font-semibold rounded-2xl text-gray-400 hover:scale-105 transition duration-400 transform
							ease-in-out active:scale-90"
							onClick={handleClose}
							>Cancel</button>
							<button 
							className="px-5 py-3 font-semibold bg-green-500 rounded-2xl text-white hover:scale-105 transition duration-400 transform
							ease-in-out active:scale-90"
							type="submit">Submit</button>

						</div>
					</form>
				</div>
			
			</Backdrop>
			<div className="flex gap-1 md:gap-2 w-full">
				<img
				src={Logo.src} 
				className="h-12 w-12 hover:scale-105 transition duration-400 ease-in-out cursor-pointer" alt="khkh"/>
				<div className="flex-col" >
					<h1 className="font-semibold text-md whitespace-nowrap hidden md:inline-flex" >My Unsplash</h1>
					<a href="https://instagram.com/nuthejashari" className="font-semibold text-sm text-sky-700 hidden md:inline-flex" >@hari_thejas</a>
				</div>
				<div className="flex justify-between w-full">	
					<div className="flex items-center justify-center border border-gray-300 px-4 rounded-2xl" >	
						<AiOutlineSearch className="h-5 w-5 md:inline-flex  text-gray-300" />
						<input type="text" 
						value={search}
						onChange={(e)=>{
							setSearch(e.target.value)
							setSearchResult('')
						}}
						placeholder="Search By Name" className="outline-none w-[150px] md:w-50 ml-2"/>
					</div>
					<div className="ml-2 onClick={reveal}" >
						<button 
						onClick={handleToggle}
						className="px-3 mr-5 py-3 bg-green-500 
						active:scale-90 transition duration-400 transform ease-out
						hover:scale-110
						rounded-2xl whitespace-nowrap  text-white font-semibold md:inline-flex hidden">Add a Photo</button>
						<button 
						onClick={handleToggle}
						className="px-3 mr-1 md:mr-5 py-3 bg-green-500 
						active:scale-90 transition duration-400 transform ease-out
						hover:scale-110
						md:hidden inline-flex
						rounded-2xl whitespace-nowrap  text-white font-semibold">Add Photo</button>
					</div>					
				</div>
			</div>
		</div>


	)
} 