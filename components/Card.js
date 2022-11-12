import {useState,useEffect} from 'react'
import Backdrop from '@mui/material/Backdrop';

export default function Card({image,idx,deleteImage}) {
	// body...
	const [mouse,setMouse] = useState(false)
	const [deleteState,setDeleteState] = useState(false)
	const [open2,setOpen2] = useState(false)
	const [pass,setPass] =useState('')

	useEffect(()=>{
		const card = document.getElementById(`${image.label}`)
		card.addEventListener('mouseover',(e)=>{
			setMouse(true)
		})
		card.addEventListener('mouseout',(e)=>{
			setMouse(false)
		})
	},[])

	const deleteimg = () =>{
		if(deleteState){
			// deleteImage(image)
		}else{
			setDeleteState(true)
			setOpen2(true)
		}
	}

	const check = () =>{
		setOpen2(false);
		if(pass === "4848"){
			setDeleteState(false)
			deleteImage(image)
		}else{
			alert("Wrong pass")
			setOpen2(false);
			setDeleteState(false)
		}
	}

	return(	
		<div id={image.label}>
			<Backdrop
			  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			  open={open2}
			>	
				<div className="flex flex-col w-80 py-5 bg-white rounded-xl items-center justify-center" >
					<input type="password" className="outline-none w-8/12 text-center p-2 text-black
					border-2 border-gray-400/40 rounded-2xl " 
					placeholder="password"
					value={pass}
					onChange={(e)=>setPass(e.target.value)}
					/>
					<button className="rounded-xl mt-5 bg-green-500 w-20 px-2 py-3"
					onClick={check}
					>Submit</button>
				</div>
			</Backdrop>
			<div className="relative bg-black rounded-xl">
				<button 
				onClick={deleteimg}
				className={`absolute bg-black/50 
				border-2 border-red-500 text-sm text-red-500 rounded-xl px-3 py-[2px]
				right-2 top-2 z-20 font-semibold ${mouse ? "absolute" : "hidden"}
				`}>{
					deleteState ? "Confirm?" : "Delete"
				}</button>
				<h1 className={`absolute bg-transparent 
				text-lg text-white rounded-xl px-3 py-[2px]
				left-2 bottom-2 z-10 font-semibold ${mouse ? "absolute" : "hidden"}
				`}>{image.label}</h1>
				<img src={image.url} alt="" 
				className="mb-5 rounded-xl transition
				duration-200 ease-in-out hover:opacity-50"
				/>
			</div>
		</div>
	)
}