"use client"

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  function handleSignup() {    
      const user = (document.getElementById("username") as HTMLInputElement)?.value;
      const pass = (document.getElementById("password") as HTMLInputElement)?.value;

      if(user == "" || pass == ""){
        alert("Username or password is blank");
      }else if(user == "test" && pass == "test"){
        router.push("./blank_dashboard")
      }else if(user == "fac" && pass == "fac"){
        router.push("./Fac_blank_dashb")
      }
      else{
        alert("Username or password is not proper!");
      }
  };

  return (
    <div
      className="
        min-h-screen
        text-zinc-800
        bg-[#f7f3e8]
        bg-[linear-gradient(to_bottom,transparent_31px,rgba(80,100,120,0.18)_32px)]
        bg-[length:100%_32px]
      "
    >

      <main className="mx-auto flex min-h-screen max-w-5xl">
        <section className="flex flex-1 flex-col">
          <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
            <p>Sign up</p>
            <input type="text" id="username" placeholder="Username" style={{
              backgroundColor: "white",
            }}/><br/>
            <input type="password" id="password" placeholder="Password" style={{
              backgroundColor: "white",
            }}/><br/>
            <button style={{backgroundColor: "#E6B52A", color: "black", borderRadius: "8px" }} onClick={handleSignup}>Sign up</button>
          </div>
        </section>
      </main>
    </div>
  )
}