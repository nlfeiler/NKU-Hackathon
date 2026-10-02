"use client"

import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  function handleLogin() {    
      const user = (document.getElementById("username") as HTMLInputElement)?.value;
      const pass = (document.getElementById("password") as HTMLInputElement)?.value;

      if(user == "" || pass == ""){
        alert("Username or password is incorrect");
      }else if(user == "test" && pass == "test"){
        router.push("./dashboard")
      }else{
        alert("Username or password is incorrect");
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
            <p>Login</p>
            <input type="text" id="username" placeholder="Username" style={{
              backgroundColor: "white",
            }}/><br/>
            <input type="password" id="password" placeholder="Password" style={{
              backgroundColor: "white",
            }}/><br/>
            <button style={{backgroundColor: "#E6B52A", color: "black", borderRadius: "8px" }} onClick={handleLogin}>Login</button>
          </div>
        </section>
      </main>
    </div>
  )
}