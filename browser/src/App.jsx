import React,{useState,useEffect} from 'react'
import api from './api/api'
import Cookies from 'js-cookies'
const App = () => {
const [error,setError]=useState({message:'',status:0})  
const [user,setUser]=useState({email:'',userName:'',password:''})
const [userloginFlage,setUserLoginFlage]=useState(false)
const [userHasAccountFlage,setUserHasAccountFlage]=useState(false)
const [forgotPassword,setForgotPassword]=useState(false)
useEffect(()=>{
  if(!Cookies.getItem('token'))
        return
      api.validateToken(Cookies.getItem('token')).then((res)=>setUserLoginFlage(true)).catch(err=>setUserLoginFlage(false))
},[])
function handleFromInput(e){
  setError({message:''})
  setUser(pre=>({...pre,[e.target.name]:e.target.value}))
}
console.log(error)
function handleRequestCode(){
  console.log('a')
}
async function handleLogin(e){
  e.preventDefault()
 try{
  const {data}= await api.login(user)
  console.log('yes')
  console.log(data)
  setUser(data.user)
  Cookies.setItem('token',data.token)
 }
catch({response}){
setError({message:response.data.error,status:response.status})
}
}
function handleForgotPassword(e){
  e.preventDefault()
  setUserHasAccountFlage(true)
  setForgotPassword(true)
  setUserLoginFlage(false)

}
async function handleSignup(e) {
    e.preventDefault();
    try{

      const {data}= await api.signup(user)
      setUser({userName:'',email:'',password:''})
      Cookies.setItem('token',data.token)
      setUserLoginFlage(true)
    }catch({response}){
      setError({message:response.data.error,status:response.status})
    }
}


return (
  <main className='min-h-screen w-full  bg-[#1C1D21] text-white grid place-content-center ' >
      {!userloginFlage ? <section className='flex justify-between  items-center  flex-col md:flex-row'>
          <article className='  mr-10 w-full grid min-h-screen sm:w-1/2 place-content-center gap-7  ' >
              {(forgotPassword && userHasAccountFlage) ? <section className='flex justify-center items-start flex-col p-4' id='forgot password' >
                  <h1 className='text-4xl pb-3' >أدخل بريدك الإلكتروني</h1>
                  <p className='text-slate-400'>دعنا نتأكد من أنك صاحب الحساب</p>
                  <input type="email" value={user.email} onChange={handleFromInput} className='pt-8 bg-[#1C1D21] w-[100%] border-b-2 py-2 border-slate-600  focus:outline-none focus:pb-4 ' placeholder='البريد الإلكتروني' name='email' />
                  <button onClick={handleRequestCode} className='mt-8 text-lg w-full py-3 hover:bg-[#ac89e5] rounded-3xl bg-[#9C6FE4]'>استلام الرمز</button>

              </section> : userHasAccountFlage ? <section id='login' className='p-8 py-6 w-80 ' >

                  <figure className='flex justify-start  flex-col  items-start gap-3 '>
                      <h1 className='text-5xl '>تسجيل الدخول</h1>
                      <p className='text-slate-500'>أدخل تفاصيل حسابك</p>
                  </figure>
                  <form className='mt-4  gap-7 flex flex-col  justify-start items-start'>
                      <input type="text" value={user.userName} className='bg-[#1C1D21] w-[100%] border-b-2 py-2 border-slate-600  focus:outline-none focus:pb-4 ' placeholder='اسم المستخدم' onChange={handleFromInput} name='userName' />
                      <input type="password" value={user.password} className='bg-[#1C1D21] w-full border-b-2 py-2 border-slate-600  focus:outline-none focus:pb-4 ' placeholder='كلمة المرور' onChange={handleFromInput} name='password' />
                      <button onClick={handleForgotPassword} className='text-slate-500 hover:text-slate-300' >هل نسيت كلمة المرور؟</button>
                      <button onClick={handleLogin} className='m-auto text-lg w-full py-3 hover:bg-[#ac89e5] rounded-3xl bg-[#9C6FE4]'>تسجيل الدخول</button>
                      {error.message ? <p className='text-red-600 text-center'>{error.message}</p> : null}
                  </form>
                  <aside className=' flex justify-around pt-10 items-center'>
                      <p className='text-slate-400'>ليس لديك حساب؟</p>
                      <button onClick={() => setUserHasAccountFlage(false)} className='bg-[#333437] rounded-md p-2 hover:bg-[#555659]'>إنشاء حساب</button>
                  </aside>
              </section> : <section id='signup' className='p-8 py-6 w-80 ' >

                  <figure className='flex justify-start  flex-col  items-start gap-3 '>
                      <h1 className='text-5xl '>إنشاء حساب</h1>
                      <p className='text-slate-500'>إعداد حسابك</p>
                  </figure>
                  <form className='mt-4  gap-7 flex flex-col  justify-start items-start'>
                      <input type="text" value={user.userName} onChange={handleFromInput} className='bg-[#1C1D21] w-[100%] border-b-2 py-2 border-slate-600  focus:outline-none focus:pb-4 ' placeholder='اسم المستخدم' name='userName' />
                      <input type="email" value={user.email} onChange={handleFromInput} className='bg-[#1C1D21] w-[100%] border-b-2 py-2 border-slate-600  focus:outline-none focus:pb-4 ' placeholder='البريد الإلكتروني' name='email' />
                      <input type="password" value={user.password} onChange={handleFromInput} className='bg-[#1C1D21] w-full border-b-2 py-2 border-slate-600  focus:outline-none focus:pb-4 ' placeholder='كلمة المرور' name='password' />
                      <button onClick={handleSignup} className='m-auto text-lg w-full py-3 hover:bg-[#ac89e5] rounded-3xl bg-[#9C6FE4]'>إنشاء حساب</button>
                      {error.message ? <p className='text-red-600 text-center'>{error.message}</p> : null}

                  </form>
                  <aside className=' flex justify-around pt-10 items-center'>
                      <p className='text-slate-400'>هل لديك حساب بالفعل؟</p>
                      <button onClick={() => setUserHasAccountFlage(true)} className='bg-[#333437] rounded-md p-2 hover:bg-[#555659]'>تسجيل الدخول</button>
                  </aside>
              </section>}
          </article>
          <figure className='sm:w-h-[50vw] bg-[#925FE2] h-screen relative w-full overflow-hidden grid place-content-center'>
              <img src="\src\assets\Vector.png" className='absolute top-0 -left-[20%]' width={250} height={300} alt="vector" />
              <img src="\src\assets\Vector (1).png" className='absolute top-[0] left-[20%]' width={200} height={200} alt="vector" />
              <img src="\src\assets\Vector (2).png" className='absolute top-[30%] right-[0]' width={150} height={150} alt="vector" />
              <img src="\src\assets\Vector (3).png" className='absolute top-[20%] -left-[20%]' width={300} height={150} alt="vector" />
              <img src="\src\assets\Vector (4).png" className='absolute top-[60%] -left-[20%]' width={200} height={150} alt="vector" />
              <img src="\src\assets\Vector (5).png" className='absolute bottom-[0] right-[0]' width={200} height={150} alt="vector" />
              <img src="\src\assets\招聘矢量插画人物场景插画招聘1100924黑与白-01 copy 1.png" className=' m-auto z-40 aspect-auto w-[100%]' width={200} height={150} alt="vector" />
          </figure>
      </section> : <section>خريطة</section>}
  </main>
    )
}

export default App