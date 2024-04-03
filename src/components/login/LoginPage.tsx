"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.sass"; 
import { signIn, useSession } from "next-auth/react";
import LoginForm from "./LoginForm/LoginForm";
import { montserrat } from "../ui/fonts/fonts";

const normalizeCPF = (cpf: string) => {
  return cpf.replace(/\.|-/g, '');
}


const LoginPage = () => {
  const { data: session } = useSession();
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const [form, setForm] = useState({
    cpf: "",
    password: "",
  });
  
useEffect(() => {
    if (session) {
        setTimeout(() => {
            router.push('/products');
        }, 2000); // Retrasa la redirección por 2000 milisegundos (2 segundos)
    }
}, [session]);


  const handleLoginFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.cpf || !form.password) {
      setErrors(['CPF y contraseña son requeridos']);
      return;
    }

    setErrors([]);

    const cpf = normalizeCPF(form.cpf);

    try {
      const responseNextAuth = await signIn("credentials", {
        cpf: cpf,
        password: form.password,
        redirect: false,
    });
    
    if (responseNextAuth?.error) {
      setErrors([responseNextAuth.error]);
      return;
    }

      router.push("/products");
  } catch (error) {
    setErrors(['Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.']);
  }
};

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };



  
  return (
    <div className={`${styles.login_img_section} ${montserrat.className}`}>
      <div className="h-screen flex">
        <div className="hidden lg:flex w-full lg:w-1/2 justify-around items-center">
          {/* <div className="bg-black opacity-20 inset-0 z-0">

          </div> */}
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          
          <div className="w-full px-8 md:px-32 lg:px-24"> 
            
            <LoginForm
              handleSubmit={handleLoginFormSubmit} 
              form={form} 
              setForm={setForm}
              handleChange={handleChange}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;









