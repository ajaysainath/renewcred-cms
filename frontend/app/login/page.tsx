"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {

  const router = useRouter();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e:any){

    e.preventDefault();

    setLoading(true);
    

    try{

 const res = await axios.post(
  `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
  {
    email,
    password,
  }
);

      document.cookie=`token=${res.data.token}; path=/`;

      router.push("/admin/dashboard");

    }catch(err:any){

      alert(err.response?.data?.message || "Login Failed");

    }

    finally{

setLoading(false);

}

  }
  

  return(

<main
className="min-h-screen grid lg:grid-cols-2"
style={{
  background:
    "radial-gradient(circle at top left,#0B6A56,transparent 35%), radial-gradient(circle at bottom right,#07443B,transparent 30%), linear-gradient(135deg,#052A30,#095748)",
}}
>

{/* LEFT */}

<motion.section
  className="
  hidden
  lg:flex
  flex-col
  justify-start
  pt-10
  px-24
  text-white
  -translate-y-10
  "
  initial={{
    opacity: 0,
    x: -80,
  }}
  animate={{
    opacity: 1,
    x: 0,
  }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
>

<Image
  src="/renewcred-logo.png"
  alt="RenewCred"
  width={240}
  height={70}
  priority
/>

<h1
className="font-heading text-[72px] leading-none mt-4 italic"
>
Carbon
<br/>
Intelligence
</h1>

<p
className="font-body mt-10 text-lg text-gray-300 max-w-lg leading-8"
>
Manage sustainability standards,
versions, documentation and
publishing from one elegant
dashboard.
</p>

<div
className="mt-16 space-y-7 font-body"
>

<div>✓ Standards Management</div>

<div>✓ Version Control</div>

<div>✓ Documentation CMS</div>

<div>✓ Secure Admin Access</div>

</div>

</motion.section>

{/* RIGHT */}

<section
className="flex justify-center items-center p-8"
>

<motion.div
className="w-full max-w-md rounded-[40px] bg-[#FFF6DF] p-10"

style={{
  boxShadow:
    "0 30px 80px rgba(0,0,0,.35)",
}}

initial={{
  opacity: 0,
  y: 60,
  scale: 0.95,
}}

animate={{
  opacity: 1,
  y: 0,
  scale: 1,
}}

transition={{
  duration: 0.8,
  delay: 0.2,
  ease: "easeOut",
}}
>


<h2
className="font-heading text-7xl italic text-[#052A30]"
>
Welcome
</h2>

<p
className="font-body text-[#095748] mt-2 mb-10"
>
Sign in to continue
</p>
<div className="h-px w-full bg-[#095748]/20 mb-8"></div>
<form
onSubmit={handleLogin}
className="space-y-6"
>

<input
type="email"
placeholder="Email Address"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="
font-body
w-full
rounded-2xl
border
border-[#095748]
bg-transparent
text-[#052A30]
px-5
py-4
outline-none
transition-all
duration-300
focus:scale-[1.01]
focus:border-[#0E6A53]
focus:shadow-[0_0_30px_rgba(9,87,72,0.25)]
placeholder:text-gray-500
"
/>

<div className="relative">

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="
font-body
w-full
rounded-2xl
border
border-[#095748]
bg-transparent
text-[#052A30]
px-5
py-4
pr-14
outline-none
transition-all
duration-300
focus:scale-[1.01]
focus:border-[#0E6A53]
focus:shadow-[0_0_30px_rgba(9,87,72,0.25)]
"
/>

<button
type="button"
onClick={() => setShowPassword(!showPassword)}
className="absolute right-5 top-1/2 -translate-y-1/2 text-[#095748]"
>

{showPassword ? (
<EyeOff size={20}/>
) : (
<Eye size={20}/>
)}

</button>

</div>

<button
disabled={loading}
className="
font-body
w-full
rounded-2xl
bg-[#0A5A46]
py-[22px]
text-lg
font-semibold
text-[#FFF6DF]
transition-all
duration-300
hover:-translate-y-1
hover:scale-[1.02]
hover:bg-[#0E6A53]
hover:shadow-[0_12px_35px_rgba(9,87,72,0.45)]
active:scale-95
"
>

{loading ? (
  <div className="flex items-center justify-center gap-3">
    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
    Signing In...
  </div>
) : (
  "Login"
)}

</button>
 
</form>

</motion.div>

</section>

</main>

  );

}