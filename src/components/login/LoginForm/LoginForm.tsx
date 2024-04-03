import React from "react";
import InputMask from 'react-input-mask';
import Image from "next/image";

const LoginForm = ({ handleSubmit, form, handleChange, errors }: any) => {




  // const handleSubmit = (event:any) => {
  //   event.preventDefault();

  //   if (!form.cpf || !form.password) {
  //     console.error('CPF y contraseña son requeridos');
  //     return;
  //   }

  //   onSubmit(form);
  // };


  return (
      <form 
        className="p-6 flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
          <div 
            className="p-4 flex flex-col justify-center items-center"
          >
            <Image
              className="p-2 mb-6 "
              src="/Alphaeduc_LOGO_HORIZONTAL_COLOR1.png"
              alt="Logo"
              width={250}
              height={150}
            />
          <h3 
            className="text-blue-600 font-semibold text-2xl mb-6"
          >
            Seja Bem-Vindo!
          </h3>
        </div>
        <div className="flex items-center border-2 mb-8 py-1 px-3 rounded-2xl gap-2">
          <label htmlFor="cpf">
            CPF
          </label>
          <InputMask
            className="rounded-xl pl-3 w-full outline-none border-none"
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            name="cpf"
            value={form.cpf}
            onChange={handleChange}
            required
          />
        </div>

        <div
          className="flex items-center border-2 mb-8 py-1 px-3 rounded-2xl gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <input
            className="rounded-xl pl-3 w-full outline-none border-none"
            type="password"
            placeholder="*********"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button 
          type="submit" 
          className="block w-full bg-indigo-500 mt-5 py-2 rounded-3xl hover:opacity-90 text-white font-semibold mb-2">
          Login
        </button>

        {/* <div className="flex justify-between mt-4">
          <span 
            className="
              text-sm ml-2 
              hover:text-blue-500 
              cursor-pointer 
              hover:-translate-y-1 
              duration-500 
              transition-all
              "
            >
            Forgot Password ?
          </span>
          <Link
            className="
              text-sm ml-2 
              hover:text-blue-500 
              cursor-pointer 
              hover:-translate-y-1 
              duration-500 
              transition-all
              "
            href="/register"
          >
            <p>Don&apos;t have an account yet?</p>
          </Link>
        </div> */}
        {errors.length > 0 && (
          <div className="mt-4">
            <ul className="text-red-600">
              {errors.map((error: string, index: number)  => (
                <li key={index}>
                  {error}
                </li>
              ))}
            </ul>
          </div>
          )}
      </form>
  );
};

export default LoginForm;