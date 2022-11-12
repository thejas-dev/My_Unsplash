import Header from '../components/Header';
import Images from '../components/Images'
import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'

const Index = ({userData}) => {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>My Unsplash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full min-h-screen flex-col max-w-6xl ">
        <Header userData={userData} />
        <Images userData={userData}/>
      </main>
    </div>
  )
}

export default Index;


export async function getServerSideProps() {
  // body...
  const userData = await fetch(`${process.env.NEXT_PUBLIC_BASE_ROUTE}/api/auth/fetch/636e1594a7b891846e49af95`)
  .then(res=>res.json())
  return{
    props:{
      userData
    }
  }
}
